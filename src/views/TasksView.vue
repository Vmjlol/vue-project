<template>


    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    </head>

    <body>

        <nav class="navbar sticky-top">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <a href="#"><i class="bi bi-yin-yang lefticon"></i></a>
            </ul>
            <form>
                <i class="bi bi-plus pointer" @mouseenter="showAddTask = !showAddTask"
                    @mouseleave="showAddTask = !showAddTask"><span class="fs-5" style="vertical-align: text-top;"
                        @click="showModalAddTask = true">Nova Tarefa</span></i>
                <i @click="showModal = true" class="bi bi-info-circle pointer"></i>
                <i class="bi bi-bell pointer"></i>
                <div class="circle">
                    <span>V</span>
                </div>
            </form>
        </nav>

        <div class="content-page">
            <div>
                <div class="leftmenu">
                    <div class="submenu">
                        <p class="pointer" @click="selectEntry()"><i class="bi bi-inbox"></i><span> Entrada</span>
                        </p>
                        <p class="pointer" @click="selectToday()"><i class="bi bi-calendar4"></i><span> Tarefas de
                                hoje</span></p>
                        <p class="pointer" @click="selectPast()"><i class="bi bi-exclamation-triangle "></i><span>
                                Vencidos</span></p>
                    </div>
                </div>
            </div>
            <div class="task-content">
                <h4>{{ title }}</h4>



                <div class="tasks" v-for="task in tasks" :key="task.id"
                    @click="selectedTask = task, selectedSubtask = selectedTask.subtasks">
                    <div class="mainbox">
                        <!-- Tasklist -->
                        {{ task.status }}
                        <div v-if="task.status == 'pending'">
                            <label class="check" @click="completeTask()">{{ task.title }}
                                <input type="checkbox" name="taskid" id="taskid" class="me-3">
                                <span class="checkmark"></span></label>
                        </div>

                        <div v-else>
                            <label class="check" @click="pendingTask()">{{ task.title }}
                                <input type="checkbox" name="taskid" id="taskid" class="me-3" checked>
                                <span class="checkmark"></span></label>
                        </div>


                        <p class="fs-6 task-comment">{{ task.description }}</p>
                        <p :class="task.due_date > moment().format('YYYY-MM-DD HH:mm:s') ? 'date-green' : 'date-red'"><i
                                class="bi bi-calendar4"></i><span>{{ momentDate(task.due_date) }}</span></p>

                        <!-- Subtasks -->
                        <!-- Teste -->
                        <div style="margin-left: 60px;" v-for="subtask in task.subtasks" :key="subtask.id">



                            {{ subtask.status }}
                            <div v-if="subtask.status == 'pending'">
                                <label class="check">{{ subtask.title }}
                                    <input type="checkbox" @click="completeSubtask()" name="subtaskid" id="subtaskid"
                                        class="me-3">
                                    <span class="checkmark"></span></label>
                            </div>

                            <div v-else>
                                <label class="check">{{ subtask.title }}
                                    <input type="checkbox" @click="pendingSubtask()" name="subtaskid" id="subtaskid"
                                        class="me-3" checked>
                                    <span class="checkmark"></span></label>
                            </div>
                            {{ subtask.status }}

                        </div>


                    </div>

                    <!-- Options -->

                    <div class="optionsTask">
                        <div @click="selectedTask = {}, showModal = true">
                            <i title="Editar Tarefa" class="bi bi-pencil pointer"></i>
                        </div>
                        <div>
                            <i title="Definir Vencimento" class="bi bi-calendar4 pointer"></i>
                        </div>
                        <div @click="deleteTask(task.id)">
                            <i title="Excluir Tarefa" class="bi bi-trash pointer"></i>
                        </div>
                    </div>

                </div>


                <div>
                    <p class="submit" @click="showModalAddTask = true">+ Criar tarefa</p>
                </div>
            </div>
        </div>

    </body>



    <ModalView :task="selectedTask" :subtask="selectedSubtask" v-model:showModal="showModal">

        <div class="modal-header">
            <i class="bi bi-calendar4 condicao"><span> {{ situacao }}</span></i>
        </div>

        <div class="modal-content">
            <div class="modal-left">
                <label class="check">{{ selectedTask.title }}
                    <input type="checkbox" name="taskid" id="taskid" class="me-3">
                    <span class="checkmark"></span>
                </label>
                <p style="margin-left:40px;">{{ selectedTask.description }}</p>
                <div class="subtasks">
                    <h2>Subtarefas</h2>

                    <div v-for="subtask in selectedTask.subtasks" :key="subtask.id" @click="selectedSubtask = subtask">
                        <label style="margin-left: 40px;" class="check"> {{ subtask.title }}
                            <input type="checkbox" name="subtaskid" id="subtaskid" class="me-3">
                            <span class="checkmark"></span>
                        </label>
                    </div>

                </div>
            </div>

            <div class="modal-right">

                <div class="modal-right-data">

                    <div>
                        <span>Criado em</span>
                        <!-- <p>{{ criacao }}</p> -->
                        <!-- <p>{{ new
                            Date(selectedTask.created_at).toLocaleDateString('pt-BR') }} às {{ new
                                Date(selectedTask.created_at).getHours() }}:{{ new
                                Date(selectedTask.created_at).getMinutes() }}
                        </p> -->
                        <p>
                            {{ momentComplete(selectedTask.created_at) }}
                        </p>
                    </div>
                    <div>
                        <span>Data de vencimento</span>
                        <p>{{ momentDate(selectedTask.due_date) }} </p>
                    </div>
                    <div>
                        <span>Modificado em</span>
                        <p>{{ momentComplete(selectedTask.updated_at) }}
                        </p>
                    </div>
                    <div>
                        <span>ID da tarefa</span>
                        <p>{{ selectedTask.id }}</p>
                    </div>
                </div>




            </div>
        </div>
    </ModalView>

    <ModalAddTask v-model:showModalAddTask="showModalAddTask">

        <h1>Oi</h1>

    </ModalAddTask>



</template>

<script>
import axios from 'axios';
import ModalView from '@/components/ModalView.vue';
import moment from 'moment';
import ModalAddTask from '@/components/ModalAddTask.vue';

export default {
    data() {
        return {
            tasks: [],
            showModal: false,
            modalTitle: "Oi",
            showAddTask: false,
            showModalAddTask: false,
            currentTitle: "Teste",
            title: "Entrada",
            situacao: "No prazo",
            selectedTask: {},
            selectedSubtask: {},
        }
    },
    components: {
        ModalView,
        ModalAddTask
    },
    mounted() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
        this.getTasks()
    },
    methods: {
        delayTask() {
            setTimeout(() => {
                this.$router.go(0);
            }, 2000);
        },
        selectEntry() {
            this.title = "Entrada"
            this.getTasks();
        },
        selectToday() {
            this.title = "Tarefas de hoje"
        },
        selectPast() {
            this.title = "Vencidos"
        },
        getTasks() {
            axios.get('task')
                .then((response) => {
                    this.tasks = response.data.data
                    console.log(this.tasks)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('Feito');
                })
        },
        updateTask() {

        },
        pendingTask() {
            const data = {
                status: 'pending'
            }
            axios.patch(`task/${this.selectedTask.id}`, data)
                .then((response) => {
                    console.log(response);
                    this.selectedTask.status = 'pending'
                    console.log('Sucesso');
                })
                .catch((error) => {
                    console.error('Erro:', error);
                });
            // this.delayTask();
            this.pendingSubtask();
        },
        completeTask() {
            const data = {
                status: 'completed'
            }
            axios.patch(`task/${this.selectedTask.id}`, data)
                .then((response) => {
                    console.log(response);
                    this.selectedTask.status = 'completed'
                    console.log('Sucesso');
                })
                .catch((error) => {
                    console.error('Erro:', error);
                });
            // this.delayTask();
            this.completeSubtask();
        },
        pendingSubtask() {
            const data = {
                status: 'pending'
            }
            console.log(this.selectedTask.subtasks);
            axios.patch(`subtask/${this.selectedSubtask.id}`, data)
                .then((response) => {
                    console.log(response);
                    this.selectedSubtask.status = 'pending'
                    console.log('Sucesso');
                })
                .catch((error) => {
                    console.error('Erro:', error);
                });
        },
        completeSubtask() {
            const data = {
                status: 'completed'
            }
            axios.patch(`subtask/${this.selectedSubtask.id}`, data)
                .then((response) => {
                    console.log(response.data);
                    console.log(this.selectedTask.subtasks.status);
                    this.selectedTask.subtasks.status = response.data.task.status
                    console.log(this.selectedTask.subtasks.status);
                    console.log('Sucesso');
                    console.log(this.selectedTask);
                })
                .catch((error) => {
                    console.error('Erro:', error);
                });
            this.getTasks();
        },
        deleteTask() {
            axios.delete(`task/${this.selectedTask.id}`)
                .then((response) => {
                    console.log(this.selectedTask.id)
                    let itemIndex = this.tasks.findIndex(task => task.id === this.selectedTask.id)
                    if (itemIndex) {
                        this.tasks.splice(itemIndex, 1)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            this.getTasks();
        },
        moment() {
            return moment();
        },
        momentComplete(value) {
            return moment(value).format('DD/MM/YYYY [às] HH:ss');
        },
        momentDate(value) {
            return moment(value).format('DD/MM/YYYY');
        }
    },
}
</script>




<style scoped>
body {
    background-color: white !important;
}

.circle {
    background: #009488;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align-last: center;
}

.leftmenu {
    -webkit-text-stroke: .5px;
    height: 100vh;
    margin-left: 80px;
    margin-top: 80px;
}

.tasks {
    border: solid 1px lightgray;
    padding: 0px 20px 20px 20px;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    width: 678px;
    top: 179px;
    left: 458px;
    gap: 0px;
    opacity: 0px;

}

.date-red {
    width: fit-content;
    margin: 5px 0px 0px 40px;
    font-size: 13px;
    padding: 2px;
    background: rgba(233, 171, 171, 0.425);
    color: darkred;
}

.date-green {
    width: fit-content;
    margin: 5px 0px 0px 40px;
    font-size: 13px;
    padding: 2px;
    background: rgba(171, 233, 176, 0.425);
    color: darkgreen;
}

.task-comment {
    font-size: 15px;
    color: gray;
    margin-left: 40px;
}

.optionsTask {
    display: flex;
    align-items: center;
    visibility: hidden;
    gap: 20px;
    font-size: 1.1rem;
}

.mainbox {
    align-content: center;
    margin-bottom: 10px;
}

.tasks:hover .optionsTask {
    visibility: visible;
}

.pointer {
    cursor: pointer;
}

.submenu {
    display: grid;
    height: 200px;
    width: 200px;
    font-size: 20px;
}

.check {
    margin-top: 15px;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 0px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    align-self: self-end;

}

.check input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    margin-top: 5px;
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border: solid gray 1px;

    border-radius: 15px;
}

.check:hover input~.checkmark {
    background-color: #ccc;
}

.check input:checked~.checkmark {
    background-color: #000000;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.check input:checked~.checkmark:after {
    display: block;
}

.check .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background: black;
    align-items: center;
}

form {
    font-size: 20px;
    display: flex;
    color: white;
    gap: 50px;
    align-items: center;
    margin-left: 40px;
    margin-right: 20px;
}

.lefticon {
    color: white;
    font-size: 25px;
    margin-left: 10px;
}

.circle span {
    color: white;
    font-size: 25px;
}

.sticky-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020
}

.content-page {
    display: flex;
    gap: 200px;
}

.task-content {
    margin-top: 50px;
    width: 100%;
}

h4 {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 10px;
}

.modal-header {
    padding-left: 50px;
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    border: 1px solid lightgray;
}

.modal-content {
    display: flex;
}

.modal-left {
    margin: 30px;
    width: 510px;
    height: 80px;
    top: 97px;
    left: 30px;
    gap: 0px;
    opacity: 0px;
    /*border: solid 1px red;*/
}

.modal-right {
    width: 246px;
    height: 557px;
    top: 67px;
    left: 573px;
    gap: 0px;
    opacity: 0px;
    /* border: solid 1px; */
}

.modal-right-data {
    display: grid;
    padding: 25px;
    gap: 30px;
}

.modal-right-data span {
    font-weight: 600;
    font-size: 20px;
    color: gray;
}

.modal-right-data p {
    font-weight: bolder;
    font-size: 18px;
    color: black;
}

.subtasks h2 {
    margin: 40px;
    font-weight: 500;
    width: 470px;
    left: 70px;
    gap: 0px;
    opacity: 0px;

}

.condicao {
    padding: 5px;
    background-color: lightgreen;
    border-radius: 5px;
}

.submit {
    cursor: pointer;
    margin-left: 30px;
    font-size: 25px;
}
</style>