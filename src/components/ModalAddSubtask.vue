<template>
    <div>
        <div class="backdrop" v-if="showModalAddSubtask">
            <div class="modal">
                <div class="header">
                    <span class="close-modal" @click="closeModal()">x</span>
                </div>
                <label>Título da Subtask</label>
                <input v-model="subtaskTitle" type="text">
                <label for=""></label>
                <button @click="createSubtask()">Criar</button>
                <!-- <slot></slot>  -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            subtaskTitle: '',
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:showModalAddSubtask', false)
        },
        createSubtask() {
            let data = {
                title: this.subtaskTitle,
                description: '',
                id_task: this.task.id
            }

            console.log(this.task);
            console.log(data);
            axios.post('subtask', data)
                .then(response => {
                    this.tasks = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    console.log('Feito');
                    this.closeModal();
                });


            // setTimeout(() => {
            //     this.$router.go(0);
            // }, 2000);
        },

    },
    props: {
        showModalAddSubtask: {
            type: Boolean,
            required: true
        },
        task: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #0005;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    display: grid;
    gap: 15px;
    padding: 25px;
    height: fit-content;
}

.modal>input {
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    padding: 12px;
    font-size: 16px;
}

.modal>label {
    font-size: 16px;
}

.modal>button {
    transition: .3s;
    height: 50px;
    background-color: #cdcdcd;
    border: none;
    border-radius: 10px;
}

.modal>button:hover {
    background-color: #bdbdbd;
    cursor: pointer;
}

.close-modal {
    color: black;
    cursor: pointer;
    gap: 0px;
    border: 2px 0px 0px 0px;
    opacity: 0px;
    font-size: 20px;
}

.header {
    text-align: end;
}
</style>