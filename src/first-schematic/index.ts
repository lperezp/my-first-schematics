import { Rule, schematic, SchematicContext, Tree, chain } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function firstSchematic(_options: any): Rule {
  return chain([
    schematic('create-structure', _options),
    (tree: Tree, _context: SchematicContext) => {
      tree.create('helloLima.ts', 'Hello Lima')

      return tree;
    }
  ])
}
