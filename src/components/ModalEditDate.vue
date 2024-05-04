<template>
    <div>
        <div class="backdrop" v-if="showModalEditDate">
            <div class="modal">
                <div class="header">
                    <span class="close-modal" @click="closeModal()">x</span>
                </div>
                <label>Data de vencimento</label>
                <input v-model="taskDuedate" type="date">

                <button @click="updateDate()">Salvar</button>

                <!-- <slot></slot> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
        }
    },
    watch: {
        showModal(newValue) {
            if (newValue == true && this.task) {
                this.taskDuedate = this.task.due_date
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:showModalEditDate', false)
        },
        updateDate() {
            let data = {
                title: this.taskTitulo,
                description: this.taskDescription,
                due_date: this.taskDuedate
            }

            axios.put('task/' + this.task.id, data)
                .then((response) => {
                    console.log(response)
                    this.$emit('update:showModalEditDate', false)
                })
                .catch((error) => {
                    console.log(error)
                })
            return
        }

    },
    props: {
        modalTitle: {
            type: String,
            default: ''
        },
        showModalEditDate: {
            type: Boolean,
            required: true
        },
        task: {
            type: Object
        },
        subtask: {
            type: Object
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