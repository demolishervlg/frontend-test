<template>
    <div class="block-comments">
        <div class="sort">
            <select v-model="modelSort">
                <option value="idup">id по возрастанию</option>
                <option value="idback">id по убыванию</option>
                <option value="dateup">дате добавления по возрастанию</option>
                <option value="dateback">дате добавления по убыванию</option>
            </select>
        </div>
        <div class="comments" v-if="getCommentsPageItems.length > 0">
            <div class="comment" v-for="comment in getCommentsPageItems">
                <div class="comment-item">
                    id: {{comment.id}}
                </div>
                <div class="comment-item">
                    name: {{comment.name}}
                </div>
                <div class="comment-item">
                    text: {{comment.text}}
                </div>
                <div class="comment-item">
                    date: {{comment.date}}
                </div>
                <div class="delete-btn">
                    <button @click="deleteComment(comment.id)">Удалить</button>
                </div>
            </div>
        </div>
        <div class="loader" v-if="!(getCommentsPageItems.length > 0)">Загрузка...</div>
        <div class="pagination">
            <div class="btns">
                <button
                    :disabled="pageNumber === 0"
                    @click="prevPage">
                    Назад
                </button>
                <button
                    :disabled="pageNumber >= pageCount -1"
                    @click="nextPage">
                    Вперёд
                </button>
            </div>
            <div class="btns-items">
                <button class="num" @click="setPageNum(num-1)" :disabled="pageNumber === num-1" v-for="num in pageCount">{{num}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "comments",
    props:{
      comments: []
    },
    data() {
        return {
            pageNumber: 0,
            size: 3,
            modelSort: 'idup'
        }
    },
    methods:{
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        },
        setPageNum(num){
            this.pageNumber = num;
        },
        deleteComment(id){
            this.$emit('delete-comment', id)
        }
    },
    computed: {
        pageCount(){
            return Math.ceil(this.comments.length/this.size);
        },
        getCommentsPageItems(){
            switch (this.modelSort){
                case 'idup' :
                    this.comments.sort((a, b) => a.id > b.id ? 1 : -1)
                    break;
                case 'idback' :
                    this.comments.sort((a, b) => a.id < b.id ? 1 : -1)
                    break;
                case 'dateup' :
                    this.comments.sort((a, b) => a.date > b.date ? 1 : -1)
                    break;
                case 'dateback' :
                    this.comments.sort((a, b) => a.date < b.date ? 1 : -1)
                    break;
            }
            const start = this.pageNumber * this.size;
            const end = start + this.size;
            return this.comments.slice(start, end);
        },
    }
}
</script>

<style scoped>
.block-comments{
    max-width: 1000px;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
}
.comments{
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.comment{
    border: 1px dashed #BCBDC0;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    position: relative;
    gap: 5px;
    padding: 10px;
    width: 100%;
}
.delete-btn{
    position: absolute;
    top: 5px;
    right: 5px;
}
.pagination{
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: 5px;
}
.pagination .btns{
    display: flex;
    flex-direction: row;
    align-items: self-start;
    gap: 5px;
}
.pagination .btns-items{
    display: flex;
    flex-direction: row;
    align-items: self-start;
    gap: 5px;
}
</style>
