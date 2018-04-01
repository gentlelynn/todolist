import * as types from './mutation-types'

export default {
  save ({commit}, plan) {
    commit(types.SAVE_PLAN, plan)
  }
}
