<template>
    <div class="page">
        <comments @delete-comment="deleteComment" :comments="$store.getters.getComments"></comments>
        <br>
        <form-comment @add-comment="addComment"></form-comment>
    </div>
</template>

<script>
import FormComment from "../components/form-comment.vue";
import Comments from "../components/comments.vue";

export default {
    name: "CommentsPage",
    components: {Comments, FormComment},
    methods: {
        addComment(formData) {
            this.$store.dispatch('addComments', formData)
        },
        deleteComment(id){
            this.$store.dispatch('deleteComment', id);
        }
    },
    mounted() {
        this.$store.dispatch('getApiComments')
    }
}
</script>

<style scoped>
.page{
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #F5F5F5;
}
</style>
