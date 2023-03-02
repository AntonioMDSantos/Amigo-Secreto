<template>
  <v-row class="row-modal" justify="center">
    <v-card>
      <v-card-title style="text-align: center">
        <span class="text-h5">Deletar Usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <h2 style="color: #673671">Deseja deletar o usuario selecionado?</h2>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="45%" dark color="red darken-1" @click="cancelDelete">
          Cancel
        </v-btn>
        <v-btn width="45%" dark color="#105269" @click="emitDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">{{
      snackbarText
    }}</v-snackbar>
  </v-row>
</template>
<script>
export default {
  props: {
    deleting: Boolean,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
      timeout: 3000,
    };
  },
  methods: {
    emitDelete() {
      this.$emit("deletar");
      this.snackbar = true;
      this.snackbarText = "Usuário deletado com sucesso";
      this.snackbarColor = "success";
      this.timeout = 5000;
    },
    cancelDelete() {
      this.$emit("close");
      this.snackbar = true;
      this.snackbarText = "Exclusão de usuário cancelada";
      this.snackbarColor = "warning";
      this.timeout = 5000;
    },
  },
  watch: {
    deleting(val) {
      if (val) {
        this.snackbar = false;
      }
    },
  },
};
</script>