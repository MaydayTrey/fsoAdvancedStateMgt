import { create } from 'zustand'

const useStatisticStore = create((/*This will become set, as we allow actions*/) => ({
    statistics: 
    {
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0,
        average: 0,
        positive: 0,
    },
    actions: {/* Empty as of right now */}, 
}))


/*These are the 'custom hooks'
Which essentially are;
A function you write which calls other hooks; that is the definition. */

export const useStatistics = () => useStatisticStore(state => state.statistics)
export const useStatisticsActions = () => useStatisticStore(state => state.actions)



