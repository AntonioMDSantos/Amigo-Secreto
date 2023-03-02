<template>
  <v-row class="row-modal" justify="center">
    <v-card width="100%">
      <v-card-title style="text-align: center">
        <span class="text-h5">Adicionar Usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" class="form">
            <v-row>
              <v-col cols="12" sm="16" md="14">
                <v-text-field 
                  v-model="nome" 
                  label="Nome" 
                  required 
                  variant="outlined"
                  :rules="[v => !!v || 'Nome é obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="16" md="14">
                <v-text-field 
                type="email"
                  v-model="email" 
                  label="Email" 
                  required 
                  variant="outlined"
                  :rules="[v => !!v || 'Email é obrigatório', v => /.+@.+/.test(v) || 'Email deve ser válido']"
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
          :disabled="!nome || !email"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      email: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success', 
      timeout: 3000
    };
  },
  methods: {
    emitSave() {
      this.$emit("save");
    },
    validate() {
  if (this.$refs.form.validate()) {
    if (/.+@.+/.test(this.email)) {
      setTimeout(() => {
        this.emitData();
        this.emitSave();
      }, 400);
    } else {
      this.snackbar = true;
      this.snackbarText = 'Por favor, insira um email válido';
      this.snackbarColor = 'error';
    }
  }
},
    close() {
      this.$emit("close");
    },
    emitData() {
      let users = {
        nome: this.nome,
        email: this.email,
      };
      this.$emit("action", users);
    },
  },
};
</script>
