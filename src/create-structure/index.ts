import { strings } from '@angular-devkit/core';
import {
  apply,
  url,
  move,
  template,
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createStructure(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const config = tree.read('/angular.json');
    if (!config) {
      // to validate if it is an angular project
      throw new SchematicsException('You are not in an Angular project. Good bye!');
    }
    _context.logger.info('Im in the create structure, create-structure')
    const source = apply(url('./files'), [
      template({
        ...strings,
        ..._options as object
      } as any),
      move(_options.path)
    ]);

    return chain([branchAndMerge(chain([mergeWith(source)]))])(tree,_context);
  };
}
