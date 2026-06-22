# Lamea Dental — WordPress Headless CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all hardcoded content in the Lamea Dental Next.js site with WordPress CMS data fetched via WPGraphQL at build time. New content managed in WordPress admin; no code deploys needed to update text/pricing/images.

**Architecture:** WordPress on AWS Lightsail (bare-metal Debian 12, Apache, MariaDB, PHP 8.2) + WPGraphQL + ACF. Next.js fetches via GraphQL queries at build time (ISR for revalidation). Mirror ium-web's `lib/wordpress/` pattern exactly.

**Tech Stack:** WordPress 7.x, WPGraphQL, Custom Post Type UI, ACF, WPGraphQL for ACF, AWS Lightsail, Apache, MariaDB, Next.js App Router

---

## Hardcoded Content Audit

| Content | File | Fields | CMS Type |
|---------|------|--------|----------|
| Treatments | `app/pricing/page.tsx` | name, price, includes | CPT: `treatment` |
| Result Cases | `app/results/page.tsx` | image, treatment, description | CPT: `result_case` |
| FAQ Entries | `app/faq/page.tsx` | question, answer | CPT: `faq` |
| Contact Info | `ContactForm.tsx` | address, email, phone label | ACF Options page |
| About Principles | `app/about/page.tsx` | title, body, images | CPT: `team_member` + ACF |
| Site Stats | `SocialProof.tsx` | value, label | CPT: `site_stat` |
| Finance Treatments | `FinanceCalculator.tsx` | name, variant, price | CPT: `treatment` (reuse) |
| WhatsApp Numbers | All files | phone number | ACF Options page |
| Nav Links | `Navigation.tsx` | label, href | ACF Theme Location |
| Footer Links | `Footer.tsx` | label, href, column | ACF Theme Location |
| Clinic Images | `about/page.tsx` | placeholder picsum | WP Media Library |

---

## File Map

```
# WordPress (remote VM — SSH via cloudflare tunnel)
SSH: cloudflared tunnel to lamea-wordpress.[domain]
/var/www/html/                           # WordPress root
/home/admin/backups/                     # Pre-change backups

# Next.js (local / repo)
app/pricing/page.tsx                     # MODIFIED — use lib/wordpress/treatments.ts
app/results/page.tsx                    # MODIFIED — use lib/wordpress/resultCases.ts
app/faq/page.tsx                        # MODIFIED — use lib/wordpress/faqs.ts
app/about/page.tsx                      # MODIFIED — use lib/wordpress/teamMembers.ts
components/ContactForm/ContactForm.tsx  # MODIFIED — use lib/wordpress/siteSettings.ts
components/SocialProof/SocialProof.tsx  # MODIFIED — use lib/wordpress/siteStats.ts
components/Navigation/Navigation.tsx    # MODIFIED — use lib/wordpress/menu.ts
components/Footer/Footer.tsx           # MODIFIED — use lib/wordpress/menu.ts
components/FinanceCalculator/FinanceCalculator.tsx  # MODIFIED — use lib/wordpress/treatments.ts

lib/wordpress/
  client.ts                             # CREATE — graphqlFetch + WP_GRAPHQL_URL
  treatments.ts                         # CREATE — getTreatments() + fallbackTreatments
  resultCases.ts                        # CREATE — getResultCases() + fallbackResultCases
  faqs.ts                              # CREATE — getFaqs() + fallbackFaqs
  teamMembers.ts                        # CREATE — getTeamMembers() + fallbackTeamMembers
  siteStats.ts                          # CREATE — getSiteStats() + fallbackSiteStats
  siteSettings.ts                       # CREATE — getSiteSettings() + fallbackSiteSettings
  menu.ts                               # CREATE — getMenuHierarchy() (WP Navigation API)
  types.ts                              # CREATE — all shared WP types
  index.ts                              # CREATE — barrel export

.env.local                              # CREATE — WP_GRAPHQL_ENDPOINT, REVALIDATE_SECRET
```

---

## WordPress Setup (Tasks 1–6)

These tasks run on the remote Lightsail VM via SSH over the Cloudflare tunnel.

### Task 1: Provision Lightsail Instance + Baseline OS

**SSH Access**: TBD — user will provide cloudflare tunnel hostname + SSH key path.

**Files:** None (cloud infrastructure)

- [ ] **Step 1: Launch Lightsail instance**
  - AWS Console → Lightsail → Create instance
  - Region: closest to UK (eu-west-2 London or us-east-1)
  - OS: Debian 12 (Bookworm)
  - Plan: 1GB RAM, 2 vCPU, 40GB SSD (~$6/mo)
  - Attach static IP

- [ ] **Step 2: SSH in and apply OS baseline**

```bash
# SSH via the cloudflare tunnel (tunnel hostname provided separately)
ssh -i /path/to/lamea-wordpress.pem admin@<tunnel-hostname>

# Update OS
sudo apt update && sudo apt upgrade -y

# Install Apache + PHP + MariaDB + essentials
sudo apt install -y apache2 mariadb-server php8.2 \
  libapache2-mod-php8.2 php8.2-cli php8.2-mysql php8.2-curl \
  php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip php8.2-opcache \
  php8.2-acpu \
  unzip curl certbot python3-certbot-apache

# Enable swap (1GB — required for MariaDB on 1GB instance)
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

- [ ] **Step 3: Configure Apache + PHP**

```bash
# PHP upload limit — 128M (for image uploads)
sudo sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 128M/' /etc/php/8.2/apache2/php.ini
sudo sed -i 's/post_max_size = 8M/post_max_size = 128M/' /etc/php/8.2/apache2/php.ini

# PHP OPcache (performance)
sudo sed -i 's/;opcache.enable=1/opcache.enable=1/' /etc/php/8.2/apache2/php.ini
sudo sed -i 's/;opcache.memory_consumption=128/opcache.memory_consumption=128/' /etc/php/8.2/apache2/php.ini

# Enable Apache rewrite module
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

- [ ] **Step 4: Harden MariaDB + create database**

```bash
sudo mysql_secure_installation  # Set root password, remove anonymous users, etc.
sudo mysql -u root -p
```

```sql
CREATE DATABASE wordpress_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wp_lamea'@'localhost' IDENTIFIED BY '<password-here>';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wp_lamea'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

- [ ] **Step 5: Register Cloudflare tunnel**

```bash
# Install cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
sudo mv /tmp/cloudflared /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared

# User provides tunnel token
sudo cloudflared service install <TUNNEL_TOKEN>
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

- [ ] **Step 6: Configure Apache vhost**

```bash
sudo tee /etc/apache2/sites-available/lamea-wordpress.conf << 'EOF'
<VirtualHost *:80>
  ServerName lamea-wordpress.<DOMAIN>
  DocumentRoot /var/www/html
  <Directory /var/www/html>
    AllowOverride All
    Require all granted
  </Directory>
  ErrorLog ${APACHE_LOG_DIR}/lamea_wordpress_error.log
  CustomLog ${APACHE_LOG_DIR}/lamea_wordpress_access.log combined
</VirtualHost>
EOF

sudo a2ensite lamea-wordpress.conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

- [ ] **Step 7: TLS via Cloudflare (Crypto tab → Always Use HTTPS)**

- [ ] **Step 8: Commit "WordPress OS baseline applied"**

---

### Task 2: Install WordPress Core + Plugins

**SSH Access**: same tunnel as Task 1.

- [ ] **Step 1: Download + install WordPress core**

```bash
cd /tmp
curl -O https://wordpress.org/latest.tar.gz
sudo tar -xzf latest.tar.gz -C /var/www/html/ --strip-components=1
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

- [ ] **Step 2: Create wp-config.php**

```bash
sudo -u www-data wp config create \
  --dbname=wordpress_db \
  --dbuser=wp_lamea \
  --dbpass='<password-here>' \
  --dbhost=localhost \
  --path=/var/www/html \
  --skip-check
```

- [ ] **Step 3: Run WordPress install CLI**

```bash
sudo -u www-data wp core install \
  --url=https://lamea-wordpress.<DOMAIN> \
  --title="Lamea Dental CMS" \
  --admin_user=admin \
  --admin_password='<admin-password>' \
  --admin_email=hello@lameadental.co.uk \
  --path=/var/www/html
```

- [ ] **Step 4: Set permalink to /%postname%/**

```bash
sudo -u www-data wp option update permalink_structure '/%postname%/'
sudo -u www-data wp rewrite flush
```

- [ ] **Step 5: Install plugins (via WP-CLI)**

```bash
# WPGraphQL — headless GraphQL API
sudo -u www-data wp plugin install wp-graphql --activate --path=/var/www/html

# WPGraphQL for ACF — expose ACF fields to GraphQL
sudo -u www-data wp plugin install wp-graphql-ide --activate --path=/var/www/html

# Custom Post Type UI — create CPTs without code
sudo -u www-data wp plugin install custom-post-type-ui --activate --path=/var/www/html

# ACF for WP — advanced custom fields (Pro key required; use free ACF or WPGraphQL for simple fields)
# If no ACF Pro key: use Meta Box plugin instead (free)
sudo -u www-data wp plugin install meta-box --activate --path=/var/www/html

# WPGatsby — not needed unless using Gatsby
```

- [ ] **Step 6: Create backups before CPT creation**

```bash
mkdir -p /home/admin/backups
sudo mysqldump wordpress_db > /home/admin/backups/wordpress-db-$(date -u +%Y%m%dT%H%M%SZ).sql
sudo cp /var/www/html/wp-config.php /home/admin/backups/wp-config-$(date -u +%Y%m%dT%H%M%SZ).php
```

- [ ] **Step 7: Commit "WordPress core + plugins installed"</**

---

### Task 3: Register CPTs + Taxonomies in WordPress

**WP Admin** at `https://lamea-wordpress.<DOMAIN>/wp-admin`

Each CPT registered via **CPT UI** plugin → Add/Edit Post Types:

**treatment** (plural: treatments, singular: Treatment)
- Show in GraphQL: YES
- Public: true
- Has archive: false
- WPGraphQL singular name: `treatment`
- WPGraphQL plural name: `treatments`
- Supports: title, editor, thumbnail, excerpt
- Taxonomies: `treatment_category`

**result_case** (plural: result cases, singular: Result Case)
- Show in GraphQL: YES
- Public: true
- Has archive: false
- Supports: title, editor, thumbnail, excerpt
- WPGraphQL singular: `resultCase`
- WPGraphQL plural: `resultCases`

**faq** (plural: FAQs, singular: FAQ)
- Show in GraphQL: YES
- Public: true
- Has archive: false
- Supports: title, editor
- WPGraphQL singular: `faq`
- WPGraphQL plural: `faqs`

**team_member** (plural: team members, singular: Team Member)
- Show in GraphQL: YES
- Public: true
- Supports: title, editor, thumbnail, excerpt

**site_stat** (plural: site stats, singular: Site Stat)
- Show in GraphQL: YES
- Public: false (admin only)
- Show in menu: false
- Supports: title, editor

**taxonomy: treatment_category**
- Hierarchical: true
- Show in GraphQL: YES

- [ ] **Step 1: Register all CPTs via CPT UI admin**
- [ ] **Step 2: Register treatment_category taxonomy**
- [ ] **Step 3: Flush GraphQL schema** — WPGraphQL → Settings → Debug → "Reload GraphQL Schema"
- [ ] **Step 4: Add 5 seed treatments via WordPress admin** (name, price per tooth, description)
- [ ] **Step 5: Add 4 seed result cases** (title, before image, after image, treatment, concern)
- [ ] **Step 6: Add 5 seed FAQs**
- [ ] **Step 7: Seed site stats (4 stats: 500+ smiles, 15+ years, 4.9 rating, 100% transparent)**
- [ ] **Step 8: Commit "CPTs registered, seed data added"</**

---

### Task 4: Register ACF Fields (Site Settings + Extended CPT Fields)

**WP Admin** at `https://lamea-wordpress.<DOMAIN>/wp-admin`

If ACF Pro is available, use it. Otherwise use Meta Box (free).

**Options Page: Site Settings** (ACF Options Page or Meta Box options)
- `whatsapp_number` — text (e.g. `447700000000`)
- `contact_email` — email
- `clinic_address` — text (full multi-line address)
- `clinic_phone` — tel
- `clinic_hours` — text
- `footer_tagline` — text
- `footer_description` — textarea

**Treatment CPT — additional fields** (via Meta Box):
- `price_from` — number (£ per tooth lower bound)
- `price_to` — number (£ per tooth upper bound)
- `includes` — text (what the price includes)
- `treatment_category` — taxonomy reference
- `visits_count` — text (e.g. "1 visit")
- `finance_available` — true/false

**Result Case CPT — additional fields:**
- `before_image` — image ID
- `after_image` — image ID
- `treatment_type` — text (e.g. "Composite Bonding")
- `concern_tag` — text (gaps/chips/shape/discoloration)
- `case_description` — textarea
- `case_cost` — text (e.g. "£600")

**Team Member CPT — additional fields:**
- `role` — text (e.g. "Principal Dentist")
- `bio` — textarea
- `highlight_order` — number (for featured ordering)

- [ ] **Step 1: Create ACF/Meta Box fields for site settings options page**
- [ ] **Step 2: Add extended fields to treatment CPT**
- [ ] **Step 3: Add extended fields to result_case CPT**
- [ ] **Step 4: Add role/bio fields to team_member CPT**
- [ ] **Step 5: Verify fields appear in WPGraphQL schema** (GraphiQL IDE at `/wp-admin/?page=graphql-api` or use WPGraphQL IDE plugin)
- [ ] **Step 6: Commit "ACF fields registered + site settings populated"</**

---

### Task 5: Build GraphQL Schema — Verify WPGraphQL Exposes All Fields

**Tools**: WPGraphQL IDE plugin (or GraphiQL) at `https://lamea-wordpress.<DOMAIN>/wp-admin/?page=graphql-api`

Run each query in the IDE to verify:

```graphql
# Test: treatments query
{
  treatments {
    nodes {
      id
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      treatmentCategory {
        nodes {
          name
        }
      }
    }
  }
}

# Test: result cases query
{
  resultCases {
    nodes {
      id
      title
      excerpt
    }
  }
}

# Test: faqs query
{
  faqs {
    nodes {
      id
      title
      content
    }
  }
}

# Test: site stats query (public CPT, query by post type)
{
  siteStats {
    nodes {
      id
      title
      content
    }
  }
}

# Test: team members query
{
  teamMembers {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
```

- [ ] **Step 1: Run treatments query — verify returns seed data**
- [ ] **Step 2: Run resultCases query — verify returns seed data**
- [ ] **Step 3: Run faqs query — verify returns seed data**
- [ ] **Step 4: Run siteStats query — verify returns seed data**
- [ ] **Step 5: Run teamMembers query — verify returns seed data**
- [ ] **Step 6: If any field missing — use WPGraphQL Settings → "Schema" → "Show in Schema" for the field group**
- [ ] **Step 7: Commit "WPGraphQL schema verified"</**

---

### Task 6: Cloudflare Tunnel + DNS + SSL

- [ ] **Step 1: Create Cloudflare Tunnel** (Cloudflare Zero Trust dashboard → Networks → Tunnels → Create tunnel)
- [ ] **Step 2: Route public hostname** `lamea-cms.lameadental.co.uk` → `http://localhost:80`
- [ ] **Step 3: Set SSL/TLS mode to Full (strict)**
- [ ] **Step 4: Verify** `https://lamea-cms.lameadental.co.uk/graphql` returns GraphQL introspection
- [ ] **Step 5: Verify** `https://lamea-cms.lameadental.co.uk/wp-admin` loads WordPress admin
- [ ] **Step 6: Commit "Cloudflare tunnel configured"</**

---

## Next.js Integration (Tasks 7–15)

### Task 7: GraphQL Client + Types

**Files:**
- Create: `lib/wordpress/types.ts`
- Create: `lib/wordpress/client.ts`

- [ ] **Step 1: Write lib/wordpress/types.ts**

```typescript
export type Treatment = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  priceFrom: number;
  priceTo: number;
  includes: string;
  visitsCount: string;
  financeAvailable: boolean;
  category: string;
  featuredImage?: string;
};

export type ResultCase = {
  id: string;
  title: string;
  excerpt: string;
  treatmentType: string;
  concernTag: string;
  caseDescription: string;
  caseCost: string;
  beforeImage: string;
  afterImage: string;
};

export type Faq = {
  id: string;
  title: string;
  content: string;
};

export type TeamMember = {
  id: string;
  title: string;
  role: string;
  bio: string;
  featuredImage?: string;
  highlightOrder: number;
};

export type SiteStat = {
  id: string;
  title: string;
  value: string;
  label: string;
};

export type SiteSettings = {
  whatsappNumber: string;
  contactEmail: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicHours: string;
  footerTagline: string;
  footerDescription: string;
};
```

- [ ] **Step 2: Write lib/wordpress/client.ts**

```typescript
const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_ENDPOINT!;

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e: { message: string }) => e.message).join(', ')}`
    );
  }

  return json.data as T;
}
```

- [ ] **Step 3: Create .env.local**

```
WP_GRAPHQL_ENDPOINT=https://lamea-cms.lameadental.co.uk/graphql
REVALIDATE_SECRET=your-secret-here
```

- [ ] **Step 4: Commit**

```bash
git add lib/wordpress/types.ts lib/wordpress/client.ts .env.local.example
git commit -m "feat(cms): add GraphQL client and WP types

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: Treatments Data Fetcher

**Files:**
- Create: `lib/wordpress/treatments.ts`

- [ ] **Step 1: Write lib/wordpress/treatments.ts**

```typescript
import { graphqlFetch } from './client';
import type { Treatment } from './types';

const TREATMENT_FIELDS = `
  id
  title
  excerpt
  treatmentFields {
    priceFrom
    priceTo
    includes
    visitsCount
    financeAvailable
  }
  treatmentCategory {
    nodes {
      name
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
`;

const TREATMENTS_QUERY = `
  query Treatments {
    treatments {
      nodes {
        ${TREATMENT_FIELDS}
      }
    }
  }
`;

export async function getTreatments(): Promise<Treatment[]> {
  try {
    const data = await graphqlFetch<{ treatments: { nodes: Treatment[] } }>(
      TREATMENTS_QUERY
    );
    return data.treatments.nodes.map((node) => ({
      ...node,
      priceFrom: node.treatmentFields?.priceFrom ?? 0,
      priceTo: node.treatmentFields?.priceTo ?? 0,
      includes: node.treatmentFields?.includes ?? '',
      visitsCount: node.treatmentFields?.visitsCount ?? '',
      financeAvailable: node.treatmentFields?.financeAvailable ?? false,
      category:
        node.treatmentCategory?.nodes?.[0]?.name ?? 'General',
      featuredImage: node.featuredImage?.node?.sourceUrl,
    }));
  } catch (err) {
    console.error('[WP] getTreatments failed, using fallback:', err);
    return fallbackTreatments;
  }
}

export const fallbackTreatments: Treatment[] = [
  {
    id: 'fallback-1',
    title: 'Composite Bonding',
    excerpt: '',
    priceFrom: 150,
    priceTo: 400,
    includes: 'Material, application, shaping, and polish',
    visitsCount: '1 visit',
    financeAvailable: true,
    category: 'Bonding',
    featuredImage: undefined,
  },
  {
    id: 'fallback-2',
    title: 'Teeth Whitening',
    excerpt: '',
    priceFrom: 250,
    priceTo: 500,
    includes: 'In-clinic session plus custom trays for home',
    visitsCount: '1–2 visits',
    financeAvailable: true,
    category: 'Whitening',
    featuredImage: undefined,
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/wordpress/treatments.ts
git commit -m "feat(cms): add treatments data fetcher with fallback

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: Result Cases Data Fetcher

**Files:**
- Create: `lib/wordpress/resultCases.ts`

- [ ] **Step 1: Write lib/wordpress/resultCases.ts**

```typescript
import { graphqlFetch } from './client';
import type { ResultCase } from './types';

const RESULT_CASE_FIELDS = `
  id
  title
  excerpt
  resultCaseFields {
    treatmentType
    concernTag
    caseDescription
    caseCost
    beforeImage {
      sourceUrl
      altText
    }
    afterImage {
      sourceUrl
      altText
    }
  }
`;

const RESULT_CASES_QUERY = `
  query ResultCases {
    resultCases {
      nodes {
        ${RESULT_CASE_FIELDS}
      }
    }
  }
`;

export async function getResultCases(): Promise<ResultCase[]> {
  try {
    const data = await graphqlFetch<{ resultCases: { nodes: ResultCase[] } }>(
      RESULT_CASES_QUERY
    );
    return data.resultCases.nodes.map((node) => ({
      ...node,
      treatmentType: node.resultCaseFields?.treatmentType ?? '',
      concernTag: node.resultCaseFields?.concernTag ?? '',
      caseDescription: node.resultCaseFields?.caseDescription ?? '',
      caseCost: node.resultCaseFields?.caseCost ?? '',
      beforeImage: node.resultCaseFields?.beforeImage?.sourceUrl ?? '',
      afterImage: node.resultCaseFields?.afterImage?.sourceUrl ?? '',
    }));
  } catch (err) {
    console.error('[WP] getResultCases failed, using fallback:', err);
    return fallbackResultCases;
  }
}

export const fallbackResultCases: ResultCase[] = [
  {
    id: 'fallback-1',
    title: 'Composite Bonding — Gaps',
    excerpt: 'Closed spacing between front teeth with natural-looking composite',
    treatmentType: 'Composite Bonding',
    concernTag: 'gaps',
    caseDescription: 'Closed spacing between front teeth with natural-looking composite',
    caseCost: '£600',
    beforeImage: 'https://picsum.photos/seed/lamea-result-1/600/500',
    afterImage: 'https://picsum.photos/seed/lamea-result-1/600/500',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/wordpress/resultCases.ts
git commit -m "feat(cms): add result cases data fetcher

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: FAQs Data Fetcher

**Files:**
- Create: `lib/wordpress/faqs.ts`

- [ ] **Step 1: Write lib/wordpress/faqs.ts**

```typescript
import { graphqlFetch } from './client';
import type { Faq } from './types';

const FAQS_QUERY = `
  query FAQs {
    faqs {
      nodes {
        id
        title
        content
      }
    }
  }
`;

export async function getFaqs(): Promise<Faq[]> {
  try {
    const data = await graphqlFetch<{ faqs: { nodes: Faq[] } }>(FAQS_QUERY);
    return data.faqs.nodes;
  } catch (err) {
    console.error('[WP] getFaqs failed, using fallback:', err);
    return fallbackFaqs;
  }
}

export const fallbackFaqs: Faq[] = [
  {
    id: 'fallback-1',
    title: 'How long does composite bonding last?',
    content:
      'With proper care, composite bonding typically lasts 5-8 years before any refinishing is needed.',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/wordpress/faqs.ts
git commit -m "feat(cms): add FAQs data fetcher

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 11: Site Settings + Site Stats Fetchers

**Files:**
- Create: `lib/wordpress/siteSettings.ts`
- Create: `lib/wordpress/siteStats.ts`

- [ ] **Step 1: Write lib/wordpress/siteSettings.ts**

```typescript
import { graphqlFetch } from './client';
import type { SiteSettings } from './types';

const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    siteSettings {
      whatsappNumber
      contactEmail
      clinicAddress
      clinicPhone
      clinicHours
      footerTagline
      footerDescription
    }
  }
`;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await graphqlFetch<{ siteSettings: SiteSettings }>(
      SITE_SETTINGS_QUERY
    );
    return data.siteSettings;
  } catch (err) {
    console.error('[WP] getSiteSettings failed, using fallback:', err);
    return fallbackSiteSettings;
  }
}

export const fallbackSiteSettings: SiteSettings = {
  whatsappNumber: '447700000000',
  contactEmail: 'hello@lameadental.co.uk',
  clinicAddress: 'The Green Garage, 126 Ashley Rd, Hale, Altrincham WA14 2UN, UK',
  clinicPhone: '+44',
  clinicHours: 'Mon–Sat 9am–6pm',
  footerTagline: 'Expert composite bonding in London.',
  footerDescription:
    'Honest pricing. Calm environment. Results that look like you — only more confident.',
};
```

- [ ] **Step 2: Write lib/wordpress/siteStats.ts**

```typescript
import { graphqlFetch } from './client';
import type { SiteStat } from './types';

const SITE_STATS_QUERY = `
  query SiteStats {
    siteStats {
      nodes {
        id
        title
        siteStatFields {
          statValue
          statLabel
        }
      }
    }
  }
`;

export async function getSiteStats(): Promise<SiteStat[]> {
  try {
    const data = await graphqlFetch<{ siteStats: { nodes: SiteStat[] } }>(
      SITE_STATS_QUERY
    );
    return data.siteStats.nodes.map((node) => ({
      ...node,
      value: node.siteStatFields?.statValue ?? node.title,
      label: node.siteStatFields?.statLabel ?? '',
    }));
  } catch (err) {
    console.error('[WP] getSiteStats failed, using fallback:', err);
    return fallbackSiteStats;
  }
}

export const fallbackSiteStats: SiteStat[] = [
  { id: 'fallback-1', title: '500+", value: "500+', label: 'Smiles delivered' },
  { id: 'fallback-2', title: '15+ years', value: '15+', label: 'Years experience' },
  { id: 'fallback-3', title: '4.9', value: '4.9', label: 'Star rating' },
  { id: 'fallback-4', title: '100%', value: '100%', label: 'Transparent pricing' },
];
```

- [ ] **Step 3: Commit**

```bash
git add lib/wordpress/siteSettings.ts lib/wordpress/siteStats.ts
git commit -m "feat(cms): add site settings and stats fetchers

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 12: Barrel Export

**Files:**
- Create: `lib/wordpress/index.ts`

```typescript
export { getTreatments, fallbackTreatments } from './treatments';
export { getResultCases, fallbackResultCases } from './resultCases';
export { getFaqs, fallbackFaqs } from './faqs';
export { getSiteSettings, fallbackSiteSettings } from './siteSettings';
export { getSiteStats, fallbackSiteStats } from './siteStats';
export type {
  Treatment,
  ResultCase,
  Faq,
  SiteStat,
  SiteSettings,
  TeamMember,
} from './types';
```

---

### Task 13: Wire Pricing Page

**Files:**
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Replace hardcoded `treatments` array with `getTreatments()`**

```typescript
import { getTreatments } from '@/lib/wordpress/treatments';

// In page component:
const treatments = await getTreatments();
// treatments is already typed as Treatment[]
```

- [ ] **Step 2: Verify** `treatment.priceFrom`, `treatment.priceTo`, `treatment.includes` used in template

- [ ] **Step 3: If WP unavailable — fallbackTreatments renders correctly**

- [ ] **Step 4: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat(cms): wire pricing page to WordPress treatments

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 14: Wire Results + FAQ + SocialProof Pages

**Files:**
- Modify: `app/results/page.tsx` — replace `cases` with `getResultCases()`
- Modify: `app/faq/page.tsx` — replace `faqs` with `getFaqs()`
- Modify: `components/SocialProof/SocialProof.tsx` — replace hardcoded stats with `getSiteStats()`

- [ ] **Step 1: Results** — `getResultCases()` returns beforeImage/afterImage URLs; use `picsum` only as absolute fallback
- [ ] **Step 2: FAQ** — `getFaqs()` returns `title` (question) and `content` (answer); strip any HTML from content
- [ ] **Step 3: SocialProof** — `getSiteStats()` returns `{ value, label }` array
- [ ] **Step 4: Commit**

---

### Task 15: Wire Contact + Navigation + Footer (Site Settings)

**Files:**
- Modify: `components/ContactForm/ContactForm.tsx` — use `getSiteSettings()` for address/email
- Modify: `components/Navigation/Navigation.tsx` — nav links remain hardcoded (they're UI, not content)
- Modify: `components/Footer/Footer.tsx` — use `getSiteSettings()` for `whatsappNumber`, `footerTagline`

**Important**: Navigation and Footer links (About/Pricing/Results/etc.) are UI structural elements, not editorial content — keep them hardcoded in the component. Only the dynamic content (phone numbers, addresses, taglines) comes from WP.

- [ ] **Step 1: ContactForm** — `getSiteSettings()` for `clinicAddress`, `contactEmail`, `clinicPhone`
- [ ] **Step 2: Footer** — `getSiteSettings()` for `footerTagline`, `footerDescription`; `whatsappNumber` for WhatsApp CTA
- [ ] **Step 3: Verify** fallbackSiteSettings renders correctly if WP unreachable
- [ ] **Step 4: Commit**

---

## Revalidation + ISR Setup

After ISR is working, add webhook to trigger revalidation when WP content changes:

**On WordPress**: Install "WP Webhooks" or "Webhook Data Sender" plugin.
**Trigger**: On `post` save/update → POST to `https://lameadental.co.uk/api/revalidate?secret=<REVALIDATE_SECRET>&slug=<post-type>`

```typescript
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const slug = req.nextUrl.searchParams.get('slug');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    await Promise.all([
      // Revalidate all pages that depend on WP content
      // Exact paths depend on which CPT changed
      NextResponse.revalidatePath('/pricing'),
      NextResponse.revalidatePath('/results'),
      NextResponse.revalidatePath('/faq'),
      NextResponse.revalidatePath('/'),
    ]);
    return NextResponse.json({ revalidated: true, slug });
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}
```

---

## Spec Coverage Checklist

| Spec Requirement | Task |
|---|---|
| Treatments in WP CMS | Task 3 + Task 8 + Task 13 |
| Result cases in WP CMS | Task 3 + Task 9 + Task 14 |
| FAQs in WP CMS | Task 3 + Task 10 + Task 14 |
| Site settings in ACF/options | Task 4 + Task 11 |
| Site stats in WP | Task 3 + Task 11 + Task 14 |
| Contact info from WP | Task 11 + Task 15 |
| WhatsApp number from WP | Task 4 + Task 11 + Task 15 |
| GraphQL schema verified | Task 5 |
| Fallback data on WP failure | Tasks 8–11 |
| ISR revalidation webhook | Task 16 |

## Verification Checklist

- [ ] `https://lamea-cms.lameadental.co.uk/graphql` returns introspection
- [ ] WPGraphQL treatments query returns seed data
- [ ] WPGraphQL resultCases query returns seed data
- [ ] WPGraphQL faqs query returns seed data
- [ ] Next.js `getTreatments()` returns WP data at build time
- [ ] `/pricing` page shows treatments from WP
- [ ] `/results` page shows result cases from WP
- [ ] `/faq` page shows FAQs from WP
- [ ] SocialProof shows stats from WP
- [ ] Contact form shows address from WP settings
- [ ] Footer WhatsApp number from WP settings
- [ ] Fallback data renders when WP is unreachable
- [ ] ISR revalidation webhook fires on WP content update
