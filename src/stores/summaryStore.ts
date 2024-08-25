import {defineStore} from 'pinia'
import Summary from '@/types/Summary'
import summaryApi from '@/composables/api/Summary'

type State = {
    summary: Summary | null
    summaryID: string
}

const useSummaryStore = defineStore('summaryStore', {
    state: (): State => ({
        summary: null,
        summaryID: ''
    }),
    getters: {},
    actions: {
        async addSummary(summary: Summary): Promise<boolean> {
            const isSuccess:boolean = await summaryApi.addUserSummary(summary)
            return isSuccess
        },
        async getSummary(): Promise<void> {
            await summaryApi.getUserSummary(this.summaryID)
                    .then(async (res) => {
                        this.summary = res
                    })
        },
        async setSummary(summaryId: string): Promise<void> {
            this.summaryID = summaryId
        },
        async deleteSummary(): Promise<void>{
            await summaryApi.deleteUserSummary(this.summaryID)
            this.summaryID = ''
            this.summary = null
        },
        async updateSummary(): Promise<void>{
            if (this.summary != null) {
                await summaryApi.updateUserSummary(this.summary);
            }
        }
    }
})

export default useSummaryStore