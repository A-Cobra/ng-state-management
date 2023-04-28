import { TestModuleMetadata } from '@angular/core/testing';

export function getTestModuleMetadata(
  declarations: any[] = [],
  imports: any[] = [],
  providers: any[] = []
): TestModuleMetadata {
  return {
    declarations,
    imports,
    providers,
  };
}
