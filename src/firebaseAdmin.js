import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { app } from './firebase'

// Auth and Storage are only needed on the /admin page — kept in a separate
// module so the public storefront bundle doesn't pay for them.
export const auth = getAuth(app)
export const storage = getStorage(app)
