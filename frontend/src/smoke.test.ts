import { describe, expect, it } from 'vitest'

describe('basic smoke test', () => {
  it('ensures the test runner is configured', () => {
    expect('Resistance Route').toContain('Route')
  })
})

