<template>
    <div>
        <div class="backdrop" v-if="showModal">
            <div class="modal">
                <span class="close-modal" @click="closeModal()">x</span>
                <h1>{{ modalTitle }}</h1>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('update:showModal', false)
        }
    },
    props: {
        modalTitle: {
            type: String,
            default: ''
        },
        showModal: {
            type: Boolean,
            required: true
        },
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
    width: 819px;
    min-height: 613px;
    position: relative;
}

.close-modal {
    position: absolute;
    color: black;
    cursor: pointer;
    height: 12px;
    top: 26px;
    left: 777px;
    gap: 0px;
    border: 2px 0px 0px 0px;
    opacity: 0px;
    font-size: 20px;
}
</style>