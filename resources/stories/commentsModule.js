import axios from "axios";

export default {
    state: {
        comments: []
    },
    mutations: {
        setComments(state,comments){
            state.comments = comments
        },
        setComment(state,comment){
            state.comments.push(comment);
        },
        deleteComment(state,commentId){
            state.comments = state.comments.filter((item) => item.id !== commentId);
        }
    },
    getters: {
        getComments(state){
            return state.comments
        }
    },
    actions: {
        async getApiComments(context){
            axios.get('/api/comments/')
                .then(response => context.commit('setComments', response.data))
        },
        async deleteComment(context, id){
            try{
                const response = await axios.delete('/api/comments/' + id);
                context.commit('deleteComment', id);
                alert('Комментарий удалён')
            }catch (error) {
                alert(error)
            }
        },
        async addComments(context, formData){
            try {
                const response = await axios.post('/api/comments/', formData);
                context.commit('setComment', response.data)
                alert('Комментарий добавлен')
            }catch (error) {
                alert(error)
            }
        }
    }
}
