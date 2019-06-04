<template>
    <div>
        <form @submit.prevent="handleFilter">
            <select v-model="filter">
                <option value="title">Title</option>
                <option value="date new-old">Date New-Old</option>
                <option value="date old-new">Date Old-New</option>
                <option value="length short-long">Length Short-Long</option>
                <option value="length long-short">Length Long-Short</option>
            </select>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                filter: 'date new-old'
            }
        },
        method: {
            handleFilter(){
                switch(this.filter){
                    case 'title':
                        this.$store.getters.sortTitle
                    break;
                    case 'date new-old':
                        this.$store.getters.sortDateNew
                    break;
                    case 'date old-new':
                        this.$store.getters.sortDateOld
                    break;
                    case 'length short-long ':
                        this.$store.getters.sortLengthShort
                    break;
                    case 'length long-short':
                        this.$store.getters.sortLengthLong
                    break;
                    default:
                    break;
                }
            }
        },
        computed: {
            getFavArray(){
                return this.$store.getters.getFavArray
            }
        }
    }
</script>

<style scoped>

</style>