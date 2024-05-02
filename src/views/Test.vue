<template>
    <modal :modalTitle="currentTitle" 
    v-model:showModal="showModal"
    >
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, nostrum est officiis incidunt voluptatibus
            reprehenderit obcaecati fugiat esse laudantium. Suscipit fugit maiores soluta excepturi reprehenderit earum
            aut distinctio impedit debitis?</p>
    </modal>
    <button @click="showModal = true">Abra o modal</button>
    <nav>
        <!-- <router-link to="/">Ir para a home</router-link> -->
        <button @click="redirectHome()">Redirecionar</button>
    </nav>

</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
    methods: {
        redirectHome() {
            this.$router.push('/')
        }
    },
    data() {
        return {
            currentTitle: 'Meu título',
            showModal: false,
        }
    },
    components: {
        Modal,
    },
}
</script>

<style scoped></style>