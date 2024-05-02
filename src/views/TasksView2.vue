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
                        v-show="showAddTask">Nova Tarefa</span></i>
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



                <div class="tasks" v-for="task in tasks" :key="task.id">
                    <div class="mainbox">
                        <label class="check">{{ task.titulo }}
                            <input type="checkbox" name="taskid" id="taskid" class="me-3">
                            <span class="checkmark"></span></label>
                        <span class="fs-5"></span>
                        <p class="fs-6 task-comment">{{ task.descricao }}</p>
                        <p class="fundodata "><i class="bi bi-calendar4"></i><span>{{ new
                            Date(task.data_vencimento).toLocaleDateString('pt-BR') }}</span></p>
                    </div>
                    <div class="optionsTask">
                        <div @click="mostrar(task)">
                            <!-- <div @click="selectedTask = task"
                        :class="selectedTask.id === task.id ? 'selected-box' : ''"> 25/04 -->
                            <i title="Editar Tarefa" class="bi bi-pencil pointer"></i>
                        </div>
                        <div>
                            <i title="Definir Vencimento" class="bi bi-calendar4 pointer"></i>
                        </div>
                        <div>
                            <i @click="deleteTask()" title="Excluir Tarefa" class="bi bi-trash pointer"></i>
                        </div>
                    </div>

                </div>


                <div>
                    <button @click="selectedTask = {}, showModal = true">Editar Task</button>
                    <button @click="showModal = true" >Editar produto</button> 
                    <!-- :disabled="!selectedTask.id" -->
                </div>
            </div>
        </div>

    </body>



    <modal v-model:showModal="showModal" :task="selectedTask">

        <div class="modal-header">
            <i class="bi bi-calendar4"><span> {{ situacao }}</span></i>
        </div>

        <div class="modal-content">
            <div class="modal-left">
                <label class="check">{{ titulo }}
                    <input type="checkbox" name="taskid" id="taskid" class="me-3">
                    <span class="checkmark"></span>
                </label>
                <p style="margin-left:40px;">{{ descricao }}</p>
                <div class="subtasks">
                    <h2>Subtarefas</h2>
                    <label style="margin-left: 40px;" class="check">Subtarefa aqui
                        <input type="checkbox" name="subtaskid" id="subtaskid" class="me-3">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>

            <div class="modal-right">

                <div class="modal-right-data">

                    <div>
                        <span>Criado em</span>
                        <!-- <p>{{ criacao }}</p> -->
                        <p>{{ new
                            Date(criacao).toLocaleDateString('pt-BR') }} às {{ new
                                Date(criacao).getHours() }}:{{ new
                                Date(criacao).getMinutes() }}
                        </p>
                    </div>
                    <div>
                        <span>Data de vencimento</span>
                        <p>{{ new
                            Date(data_vencimento).toLocaleDateString('pt-BR') }} </p>
                    </div>
                    <div>
                        <span>Modificado em</span>
                        <p>{{ new
                            Date(atualizacao).toLocaleDateString('pt-BR') }} às {{ new
                                Date(atualizacao).getHours() }}:{{ new
                                Date(atualizacao).getMinutes() }}
                        </p>
                    </div>
                    <div>
                        <span>ID da tarefa</span>
                        <p>{{ id }}</p>
                    </div>
                </div>




            </div>
        </div>
    </modal>



</template>

<script>
import axios from 'axios';
import Modal from '@/components/Modal.vue';

export default {
    data() {
        return {
            tasks: [],
            showModal: false,
            modalTitle: "Oi",
            showAddTask: false,
            currentTitle: "Teste",
            title: "Entrada",
            situacao: "No prazo",
            selectedTask: false,
        }
    },
    watch: {
        showModal(newValue) {
            if (newValue === true && this.task) {
                this.taskTitulo = this.task.titulo
                this.taskDescricao = this.task.descricao
            }
        }
    },
    components: {
        Modal,
    },
    mounted() {
        // axios.default.baseURL = 'http://localhost:80/crud-tasks/public';
        this.getTasks()
    },
    methods: {
        getTasks() {
            axios.get('http://localhost:80/crud-tasks/public/tasks')
                .then(response => {
                    this.tasks = response.data;
                    // this.tasks = response.data.data; 25/04
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    console.log('A requisição acabou!');
                });
        },
        deleteTask() {
            axios.delete(`http://localhost:80/crud-tasks/public/tasks/1`)
                .then(response => {
                    console.log(response);
                    // this.tasks = response.data;
                    // this.tasks = response.data.data; 25/04
                    let itemIndex = this.tasks.findIndex(task => task.id === this.selectedTask.id)
                    if (itemIndex) {
                        this.tasks.splice(itemIndex, 1)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectEntry() {
            this.title = "Entrada"
        },
        selectToday() {
            this.title = "Tarefas de hoje"
        },
        selectPast() {
            this.title = "Vencidos"
        },
        mostrar(task) {
            this.id = task.id,
                this.descricao = task.descricao,
                this.showModal = true,
                this.data_vencimento = task.data_vencimento
            this.titulo = task.titulo,
                this.criacao = task.created_at,
                this.atualizacao = task.updated_at,
                this.currentTitle = "Tarefa #" + task.id + " - " + task.titulo
        },
    },
}
</script>




<style scoped>
body {
    background-color: white !important;
}

.selected-box {
    background-color: #fff2;
    padding: 200px;
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
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 678px;
    height: 109px;
    top: 179px;
    left: 458px;
    gap: 0px;
    opacity: 0px;

}

.fundodata {
    width: fit-content;
    margin-top: 0px;
    font-size: 13px;
    padding: 2px;
    background: rgba(233, 171, 171, 0.425);
    color: darkred;
    margin-left: 40px;
    margin-bottom: 10px;
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
</style>