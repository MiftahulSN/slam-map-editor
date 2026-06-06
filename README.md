<div align="center">

# SLAM Map Editor

**A web-based editor for SLAM maps with semantic Nav2 filter support.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![ROS2](https://img.shields.io/badge/ROS2-Compatible-purple.svg)](https://docs.ros.org/en/rolling/) [![Nav2](https://img.shields.io/badge/Nav2-Filters-green.svg)](https://navigation.ros.org/)

![Screenshot](assets/app.png)

</div>

---

## ✨ Features

### Map Editing
| Tool | Description |
|---|---|
| **Wall** | Paint occupied cells (black/walls) |
| **Erase** | Erase walls and filter zones |
| **Un-Scan** | Mark area as unknown |
| **Line / Rectangle** | Clean straight edges and filled shapes |
| **Measure** | Measure distance between two points |

- Adjustable brush size slider
- Drag & drop PGM + YAML files to load
- Undo / Redo (`Ctrl+Z` / `Ctrl+Y`)

### Semantic Filter Zones
| Zone | Color | What It Does |
|---|---|---|
| **Keepout** | 🔴 | Marks impassable zones |
| **Speed** | 🟡 | Sets speed limit (1–100%) |
| **Stairs** | 🔵 | Removes obstacle cost in marked area |
| **Guidance** | 🟢 | Marks preferred navigation paths |

### Controls
| Input | Action |
|---|---|
| `Left click` | Draw with selected tool |
| `Middle click` + drag | Pan the map |
| `Right click` | Disabled (no context menu) |
| `Spacebar` + drag | Pan the map |
| `Shift` + scroll | Zoom to cursor |
| `Ctrl+Z` / `Ctrl+Y` | Undo / Redo |

---

## 🚀 Getting Started

### Run Locally

Clone the repo and open `src/app.html` with your browser, no server or build step needed.

```bash
git clone https://github.com/MiftahulSN/slam-map-editor.git
```

### GitHub Pages

Try the hosted version directly

👉 [https://miftahulsn.github.io/slam-map-editor/src/app.html](https://miftahulsn.github.io/slam-map-editor/src/app.html)

### Known Issue

> ⚠️ **PGM may need to be loaded twice.** If the map does not appear after loading the PGM file, try loading it again. This is a known bug.

---

## 📖 Usage

Demo maps are included in the `assets/maps` folder.

1. **Load your map** : drag & drop `map.yaml` and `map.pgm` into the drop zone.
2. **Pick a tool** : Wall, Erase, Un-Scan, Keep-Out, Speed, Stairs, or Guidance.
3. **Draw** : use freehand, line, or rectangle mode. Adjust brush size with the slider.
4. **Speed tool** : set the percentage (1–100%) with the slider before drawing.
5. **Export** : click `Download Map` or `Download Semantic Mask` when done.

---

## 📦 Output

The app produces **two** separate outputs, you need both for a complete Nav2 setup.

### `Download Map` 🗺️
Exports the **edited base map** as `map_edited.pgm` + `map_edited.yaml`

- Your occupancy grid with wall/erase/unscan edits
- No filter zone data included
- Used by Nav2's `map_server`

### `Download Semantic Mask` 🎨
Exports the **semantic overlay** as `map_semantic.pgm` + `map_semantic.yaml`

- All filter zones (keepout, speed, stairs, guidance) in one PGM file
- Pixel values encode zone types (see encoding table below)
- Used by Nav2's `costmap_filter` plugins

---

## 🔌 Nav2 Filter Compatibility

| Filter | Type | Status |
|:---|:---|:---|
| 🚫 Keepout | Nav2 **built-in** | Works with `keepout_filter` out of the box |
| ⏱️ Speed | Nav2 **built-in** | Works with `speed_filter` out of the box |
| 🪜 Stairs | **Custom** plugin | Requires [nav2-filters](https://github.com/MiftahulSN/nav2-filters) |
| 🧭 Guidance | **Custom** plugin | Requires [nav2-filters](https://github.com/MiftahulSN/nav2-filters) |

> _For the custom **Stairs** and **Guidance** costmap filter plugins_ 
👉 **[MiftahulSN/nav2-filters](https://github.com/MiftahulSN/nav2-filters)**

---

## 📊 Semantic PGM Encoding

The semantic mask is a single PGM file where pixel values represent zone types:

| PGM Value | Zone | Editor Color | Nav2 Behavior |
|:---:|---|:---:|---|
| `0` | Keepout | 🔴 | Lethal cost — impassable |
| `1`–`100` | Speed | 🟡 | Speed limit at that percentage |
| `128` | Stairs | 🔵 | Override cost to free — removes obstacles |
| `160` | Guidance | 🟢 | Set minimal cost — preferred path |
| `255` | Free | transparent | No action |

> _Values `101-127`, `129-159`, and `161-254` are reserved for future filters._

---

## 🙏 Acknowledgements

This project is a fork of [ROS SLAM Map Editor](https://github.com/GyroPalm/ROS-SLAM-Map-Editor) by [Dominick Lee](https://dominicklee.com). If you use this tool in your work or research, please cite the original work.

> Lee, Dominick. (2025). ROS SLAM Map Editor [Computer software]. GyroPalm, LLC. https://github.com/GyroPalm/ROS-SLAM-Map-Editor

Upgraded by [MiftahulSN](https://github.com/MiftahulSN). This project remains open-source under the MIT License, see [LICENSE](LICENSE) for details.
