import { TestBed } from '@angular/core/testing';

import { ToDoListResolver } from './to-do-list.resolver';

describe('ToDoListResolver', () => {
  let resolver: ToDoListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ToDoListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
