<template>
  <v-row class="row-modal" justify="center">
    <v-card width="100%">
      <v-card-title style="text-align: center">
        <span class="text-h5">{{
          selectedUser ? "Atualizar Usuario" : "Adicionar Usuario"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" class="form">
            <v-row>
              <v-col cols="12" sm="16" md="14">
                <v-text-field
                  v-model="user.nome"
                  label="Nome"
                  required
                  variant="outlined"
                  :rules="[(v) => !!v || 'Nome é obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="16" md="14">
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  required
                  variant="outlined"
                  :rules="[
                    (v) => !!v || 'Email é obrigatório',
                    (v) => /.+@.+/.test(v) || 'Email deve ser válido',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn width="45%" dark color="red darken-1" @click="close">
          Close
        </v-btn>
        <v-btn
          width="45%"
          dark
          color="#105269"
          @click="validate()"
          :disabled="!user.nome || !user.email"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>
  
  <script>
export default {
  props: {
    selectedUser: {
      type: Object,
      default: () => ({ nome: "", email: "" }),
    },
  },
  data() {
    return {
      user: { ...this.selectedUser },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        setTimeout(() => {
          this.$emit("action", this.user);
        }, 400);
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
  