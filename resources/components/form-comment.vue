<template>
    <div class="block-form" @submit="onSubmit($event)">
        <form class="form">
            <div class="form-field">
                <label for="name">Имя</label>
                <input type="text" id="name" name="name">
            </div>
            <div class="form-field">
                <label for="text">Текст</label>
                <input type="text" id="text" name="text">
            </div>
            <div class="form-field">
                <label for="date">Дата</label>
                <date-picker
                    id="date"
                    v-model="date"
                    name="date"
                    format="YYYY-MM-DD"
                    date-format="YYYY-MM-DD"
                ></date-picker>
            </div>
            <div class="form-field">
                <input type="submit" value="Отправить">
            </div>
        </form>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: "form-comment",
    components:{DatePicker},
    data() {
        return {
            date: ''
        }
    },
    methods: {
       async onSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            this.$emit('add-comment', formData)
       }
    }
}
</script>

<style scoped>
.block-form{
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
.form{
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: 5px;
}
</style>
