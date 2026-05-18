import { it, expect, describe, vi } from 'vitest';

vi.mock('react-loader-spinner', () => ({
  Hourglass: () => <div>Spinner</div>,
}));

import { router } from '../src/router';

describe('router', () => {
  it('should export browser router configuration', () => {
    expect(router).toBeDefined();
    expect(router.routes.length).toBeGreaterThan(0);
  });
});
