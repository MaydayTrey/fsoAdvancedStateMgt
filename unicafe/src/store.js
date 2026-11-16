import { create } from 'zustand'

const useStatisticStore = create(set => ({
    statistics: 
    {
        good: 0,
        neutral: 0,
        bad: 0,
    },

    actions: {
        increment: (button) => set(state => ({
            statistics: {...state.statistics, [button]: state.statistics[button] + 1}
        })),
    }, 
}))


/*These are the 'custom hooks'
Which essentially are;
A function you write which calls other hooks; that is the definition. */

export const useStatistics = () => useStatisticStore(state => state.statistics)
export const useStatisticsActions = () => useStatisticStore(state => state.actions)



