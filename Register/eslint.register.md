# Eslint

### Implementación de la configuración de eslint dada por Carlos Pajuelo
`Date: 2/13/2023`

#### Problema (Un-resolved path module)
El plugin [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) presentó problemas a la hora de resolver rutas, cuya causa probable es que no puede resolver archivos con extensión .ts
<img src="https://i.ibb.co/9T0WnCr/no-resolved.png" />

#### Solución
Se añadio el plugin [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript), el cual añade soporte a "eslint-plugin-import".
- Configuración adicional al eslintrc
```ts
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
```
<img src="https://i.ibb.co/02788Pj/solucion-unresolved.png" />

---

#### Problema (Incompatibilidad de plugins al ordernar imports)
Los plugins [simple-import-sort/imports](https://github.com/lydell/eslint-plugin-simple-import-sort) y **eslint-plugin-import** entran en conflicto a la hora de ordenar los imports en base a sus propias reglas

#### Solución
Se optó por la configuración de ordenamiento del plugin **eslint-plugin-import**, a través de la regla **import/orden** en lugar de las reglas **"simple-import-sort/imports": "error"** y **"simple-import-sort/exports": "error"**

<img src="https://i.ibb.co/QDYN9DJ/reglas-ordenamiento.png" />

---

#### Problema (no-unused-vars)
Los plugins [eslint](https://eslint.org/docs/latest/rules/no-unused-vars)  entran en conflicto [@typescript-eslint](https://typescript-eslint.io/rules/no-unused-vars/) en esta regla en especifico **no-unused-vars**

#### Solución
Desactivar la relga en cuestión para el plugin de **eslint**, y permanecer con la regla de **@typescript-eslint**

<img src="https://i.ibb.co/Fnpz0YV/Screenshot-4.png" />

---

#### Problema (Un-used-vars)
Cuando se da una destructuración para filtrar algún dato y no se llega a usar.

<img src="https://i.ibb.co/Xsjz51F/Screenshot-5.png" />

#### Solución
Ignorar esta verificación para este caso en específico, debido a que es un caso muy común. Con la ayuda de la propiedad **ignoreRestSiblings** en **true**.

<img src="https://i.ibb.co/kMHW8vj/Screenshot-6.png" />