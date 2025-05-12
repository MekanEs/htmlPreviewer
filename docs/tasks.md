# HTML Previewer Application - Styling Guidelines

## Current Analysis

The application currently uses SCSS with a mix of approaches:

- Global styles in `src/App.scss`
- Component-specific module files (`*.module.scss`)
- Shared styles in the `src/styles/` directory organized in:
  - `abstracts/` (variables, mixins)
  - `base/` (reset, typography)
  - `components/` (buttons, forms)

The codebase has a dark theme with good variable structure but shows inconsistencies in style application and some duplication of styling logic.

## Unified Styling Approach

### 1. SCSS Architecture

#### Maintain and enhance the current structure:

```
src/
└── styles/
    ├── main.scss            # Main entry point
    ├── abstracts/
    │   ├── _variables.scss  # Theme variables
    │   └── _mixins.scss     # Reusable mixins
    ├── base/
    │   ├── _reset.scss      # CSS reset/normalize
    │   └── _typography.scss # Typography rules
    ├── components/          # Reusable component styles
    │   ├── _buttons.scss
    │   ├── _forms.scss
    │   ├── _tabs.scss       # New
    │   └── _lists.scss      # New
    └── layout/              # New section for layouts
        ├── _container.scss
        └── _grid.scss
```

### 2. Component Styling Standards

#### Module approach for component-specific styles:

- Each component should have its own `.module.scss` file
- Import variables and mixins from abstracts
- Use consistent naming conventions:
  - Prefer kebab-case for class selectors in global styles
  - Use PascalCase for root component classes in module files
  - Use camelCase for variant and child elements

### 3. Theme System

Enhance the existing dark theme system:

- Maintain the current dark theme variables
- Prepare for potential theme switching by organizing variables semantically
- Consider implementing CSS variables for runtime theme switching

### 4. Styling Best Practices

- Use mixins for repeating patterns
- Follow BEM-inspired naming convention
- Ensure responsive design
- Optimize specificity
- Minimize style duplication

## Implementation Tasks

### Specific Issues Identified

- **`App.scss`:** Contains global styles for `select` and a `.bordered` class that should be moved to `_forms.scss` and potentially a mixin or component module respectively. Global scrollbar styles conflict/duplicate the `custom-scrollbar` mixin.
- **Component Modules:** Inconsistent naming conventions (`.List` vs `.Frame`). Common patterns (layout, list items, button-like elements) exist within modules and should be extracted. Abstract imports (`_variables.scss`, `_mixins.scss`) need verification across all modules.
- **Shared Styles:** `_forms.scss` is empty. `_buttons.scss` styles need review against component usage. The `bordered` mixin exists, but `.bordered` classes are defined elsewhere.
- **Empty Files:** `src/index.css` needs removal if unused. `src/styles/components/_forms.scss` needs content.

### Immediate Tasks (Refined)

1.  **Standardize Component Module Files:**

    - **Naming:** Enforce PascalCase for root class (`.MyComponent`), camelCase for elements/variants (`.myElement`, `.isActive`) across **all** `.module.scss` files (e.g., refactor `List.module.scss`, `Frame.module.scss`, etc.).
    - **Imports:** Ensure **all** `.module.scss` files import `_variables.scss` and `_mixins.scss` as needed.
    - **Refactor:** Identify and extract common layout patterns (flex containers, spacing) into mixins or dedicated layout components/styles.

2.  **Expand Shared Component Styles:**

    - **Create `_tabs.scss`:** Extract common tab styling from `Editor.module.scss` and `TabContainer.module.scss`.
    - **Create `_lists.scss`:** Extract common list/list item styling from `List.module.scss` and `Images.module.scss`.
    - **Populate `_forms.scss`:** Move `select` styles from `App.scss`. Add base styles for `input`, `textarea`, etc., referencing `Input.module.scss`.
    - **Refine `_buttons.scss`:** Align with styles in `Button.module.scss` and ensure consistency.

3.  **Clean Up Global Styles (`App.scss`):**
    - **Move:** Relocate `select` styles to `_forms.scss`.
    - **Remove/Refactor:** Remove the global `.bordered` class (use the `bordered` mixin or component-specific styles). Remove global scrollbar styles; rely solely on the `@include custom-scrollbar` mixin where needed.
    - **Verify:** Ensure remaining styles are truly global (e.g., `body`, `#root`).

### Medium-term Tasks (Refined)

4.  **Implement Layout System:**

    - Create `src/styles/layout/_container.scss` and `_grid.scss`.
    - Define reusable layout classes/mixins (e.g., `.container`, `.row`, `.col-*`) based on patterns extracted in Immediate Task 1.
    - Refactor components (e.g., `Frame`, `EditorPage`) to use these shared layout styles/components.

5.  **Enhance Forms Styling (`_forms.scss`):**

    - Complete comprehensive styling for all standard form elements (`input[type=text]`, `input[type=number]`, `textarea`, `checkbox`, `radio`, etc.).
    - Ensure consistency with `Input.module.scss` and `Button.module.scss`.
    - Define styles for validation states (`.error`, `.warning`, `.success`).

6.  **Responsive Design Improvements:**
    - Define breakpoints in `_variables.scss`.
    - Use `@mixin breakpoint-up/down` in component modules and layout styles where necessary.
    - Test and adjust layouts/components for common screen sizes (mobile, tablet, desktop).

### Long-term Tasks (No changes from previous version)

7.  **Theme switching capability**

    - Convert key theme variables to CSS custom properties.
    - Implement a theme context for switching.

8.  **Style documentation**
    - Create a style guide showing all components.
    - Document the theming system.

## Code Examples

### Component Module Example

```scss
@import '../../styles/abstracts/variables';
@import '../../styles/abstracts/mixins';

.Component {
  @include container-base;

  &__element {
    // Element styles
  }

  &--variant {
    // Variant styles
  }
}
```

### Mixin Usage Example

```scss
.Component {
  @include flex-column;
  @include custom-scrollbar;

  &__button {
    @include button-base;
  }
}
```

## Conclusion

Implementing these guidelines will create a more cohesive visual language across the application, reduce style duplication, and improve maintainability. The approach builds on the current structure while standardizing patterns and preparing for future enhancements.
