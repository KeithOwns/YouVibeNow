# MLO Setup Prep Sheet, Andrew S. Call

## Job summary
- TP-Link Archer BE series mesh (primary + satellite), both firmware current
- Desktop uses TP-Link Archer TBE553E, Wi-Fi 7, MLO capable
- Goal: enable MLO so desktop pulls simultaneous 5GHz + 6GHz for max throughput

## Session flow
1. Confirm remote access (AnyDesk or TeamViewer) connects cleanly before touching routers
2. Log into primary TP-Link router admin (app or web UI)
3. Locate MLO toggle, typically under:
   - Advanced Settings > Wireless > Wi-Fi 7 / Multi-Link Operation
   - Or within the mesh network settings if using TP-Link Deco/OneMesh app
4. Enable MLO on the SSID the desktop connects to
5. Let the router auto-manage channel selection, do not manually set fixed channels on 5GHz/6GHz once MLO is on, this is likely what fought his manual attempts before
6. Reboot order: gateway first, then primary router, then satellite
7. On the desktop, confirm the TBE553E driver is current (check TP-Link's site if unsure)
8. Reconnect desktop to the network, verify it shows an MLO or combined-band link in the TP-Link client utility or Windows network status
9. Run a quick speed test to confirm improvement over baseline

## Fallback if MLO won't stick
- Firmware reflash (not just update check) on primary router
- Factory reset primary router and reconfigure mesh from scratch, last resort
- Confirm TBE553E driver isn't outdated, driver mismatches are a common silent blocker

## Notes to relay to Andrew
- Once MLO is on, resist the urge to hand-tune per-band frequencies again, that reintroduces the overlap problem
- Confirm downstairs coverage is still solid after the change, MLO changes shouldn't affect the satellite's normal band usage
