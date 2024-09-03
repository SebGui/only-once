import {defineStore} from 'pinia'
import Summary from '@/types/Summary'
import summaryApi from '@/composables/api/Summary'
import { nextTick } from 'vue'

type State = {
    summary: Summary | null
    summaryID: string
    isLoading: boolean
}

const useSummaryStore = defineStore('summaryStore', {
    state: (): State => ({
        summary: null,
        summaryID: '',
        isLoading: true
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
                        await nextTick().then(() => {
                            this.isLoading = false
                        })
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