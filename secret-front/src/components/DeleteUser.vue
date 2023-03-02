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
  </v-row>
</template>
<script>
export default {
  props: {
    deleting: Boolean,
  },
  data() {
  },
  methods: {
    emitDelete() {
      this.$emit("deletar");
    },
    cancelDelete() {
      this.$emit("close");
    },
  },
};
</script>