# MEMORIA DE CAMBIOS - my_web

Lee este archivo para recordar el estado actual y lo que hemos hecho en el proyecto.

## Proyecto

Sitio web personal de **Gerardo LCDF** (GerryLCDF). Repo: `https://github.com/GerryLCDF/myweb.git`, rama `main`.

## Cambios realizados

### 1. Iconos de redes sociales en index.html
- **X (Twitter)**: nuevo SVG estilo Tabler (`stroke`, viewBox 0 0 24 24).
- **YouTube**: nuevo SVG estilo Tabler (`fill`, viewBox 0 0 24 24).
- **Instagram**: nuevo SVG estilo Tabler (`stroke`, viewBox 0 0 24 24).
- **Bluesky** (la mariposa): ELIMINADO.
- **Itch.io**: nuevo SVG (viewBox 0 0 16 16, Font Awesome).
- Links: twitter.com/GerardoLCDF, youtube.com/@LCDF, instagram.com/gerardo_lcdf, gerardolcdf.itch.io

### 2. Color de iconos (index.html + stile_home.css)
- Todos los iconos son **blancos** por defecto.
- Al hacer hover cambian a **#26CFD2** (el mismo color del texto de YouTube en el párrafo).
- Siguen la forma del icono (no se rellenan): los de `stroke` solo cambian trazo, los de `fill` solo cambian relleno.
- Regla CSS en `css/stile_home.css`:
  - `.social-icons svg[fill="#fff"]:hover` => `fill: #26CFD2`
  - `.social-icons svg[stroke="#fff"]:hover` => `stroke: #26CFD2`

### 3. Footer global (todas las páginas)
- Agregado a los 16 archivos HTML.
- Contenido: `© 2026 LCDF. All rights reserved.` + iconos de redes sociales (X, YouTube, Instagram, Itch.io).
- Estilos en `css/common.css` (clase `.site-footer`, `.social-icons-footer`).
- Centrado, fondo `#1a1a1a`, borde superior `#333`, copyright en `#888`.
- Hover de iconos del footer: mismo comportamiento (#26CFD2).

## Archivos HTML con el footer

index, bio, game, gustos, youtube, Portfolio, contact, ambidextro, ButtonInTheJungle, Buttons_game, collection_text, collection_windows, GerryToll, links, prueva1, SoloSube (.html)

## Estructura

- `index.html`: portafolio principal, 2 columnas (foto + texto), menú hamburguesa, iconos de redes.
- `css/common.css`: reset, menú, sidebar, overlay, fade-in y footer.
- `css/stile_home.css`: estilos propios de la home.
- `js/menu.js`, `js/script.js`: menú y animaciones.
- Otras páginas usan su propio CSS/JS (bio, contacto, etc.).

## Comandos de git

```bash
git status
git add .
git commit -m "mensaje"
git push origin main
```

## Notas
- Las páginas arrancan con frontmatter Jekyll (`---`).
- Cursos de colores: acento `#26CFD2`, negros `#000`/`#111`, texto en grises/blancos.