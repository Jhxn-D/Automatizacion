# Automatizacion de pruebas E2E con Playwright y TypeScript

Nombre: Jhon David Morales
Materia: Ingenieria de Software III - Universidad Libre

## Aplicacion elegida
Para este laboratorio use la pagina Practice Software Testing (Toolshop): https://practicesoftwaretesting.com

Al principio intente automatizar sobre Mercado Libre, pero al hacer busquedas desde Playwright salia un CAPTCHA que bloqueaba la pagina. Cambie a Toolshop porque es una tienda hecha para practicar automatizacion, es estable y sus elementos tienen atributos data-test claros para ubicarlos sin problemas.

## Historias de usuario

### HU-01: Busqueda de productos
Como usuario de la tienda quiero buscar productos en la barra principal para encontrar rapido lo que necesito o ver si no esta disponible.

Criterios de aceptacion:
- Si busco "Hammer", el primer producto de la lista debe tener "Hammer" en su nombre.
- Si busco algo que no existe como "xyz123987", debe salir el mensaje "There are no products found.".

### HU-02: Filtro por categoria
Como usuario de la tienda quiero filtrar el catalogo usando los checkboxes de categorias para ver solo herramientas de un tipo.

Criterios de aceptacion:
- Al marcar "Power Tools", el catalogo se actualiza y muestra las tarjetas de esa categoria.

### HU-03: Agregar al carrito
Como usuario de la tienda quiero entrar a un producto y agregarlo al carrito para ir armando mi compra.

Criterios de aceptacion:
- Al abrir "Combination Pliers" y dar clic en "Add to cart", el contador del carrito debe cambiar a "1".

## Casos de prueba

| Caso | HU | Prueba | Dato | Resultado esperado | Estado |
| --- | --- | --- | --- | --- | --- |
| CP-01 | HU-01 | Busqueda con resultados | "Hammer" | El primer resultado contiene "Hammer" | Paso |
| CP-02 | HU-01 | Busqueda sin resultados | "xyz123987" | Aparece "There are no products found." | Paso |
| CP-03 | HU-02 | Filtrar por categoria | "Power Tools" | Se muestran tarjetas de esa categoria | Paso |
| CP-04 | HU-03 | Agregar al carrito | "Combination Pliers" | El carrito marca "1" | Paso |

## Organizacion de las pruebas
- Configure baseURL en playwright.config.ts para usar page.goto('/') en lugar de repetir toda la URL.
- Agrupe los casos con test.describe y use test.beforeEach para abrir la pagina principal antes de cada prueba.
- Agregue etiquetas (@smoke, @busqueda, @filtros, @carrito) y anotaciones con el numero de historia de usuario.
- Deje activadas las capturas, videos y trazas en playwright.config.ts para ver todo en el reporte HTML.

## Comandos para ejecutar

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright test --headed
npx playwright test --grep @smoke
npx playwright show-report
