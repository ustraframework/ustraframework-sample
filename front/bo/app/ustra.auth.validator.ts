import { defineUstraAuthValidator } from '#imports'

export default defineUstraAuthValidator(({ $ustra, to }) => {
  if (to.path === '/auth/validation') {
    return false
  }
})
