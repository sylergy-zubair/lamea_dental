# RTK - Token Optimization

RTK (`~/.local/bin/rtk`) reduces token consumption 60-90% on shell commands. Always use `rtk` prefix when running supported commands:

**Git operations** — `rtk git status`, `rtk git diff`, `rtk git log -n 10`, `rtk git push`, `rtk git pull`, `rtk git add`, `rtk git commit`

**File operations** — `rtk ls .`, `rtk read <file>`, `rtk find "<pattern>" .`, `rtk grep "<pattern>" .`

**Build & test** — `rtk cargo test`, `rtk npm test`, `rtk cargo build`

**Direct passthrough** — `rtk proxy <cmd>` (when you need unfiltered output)

**Analytics** — `rtk gain`, `rtk gain --history`
