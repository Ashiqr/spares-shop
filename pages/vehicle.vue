<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Make:" label-for="input-1">
            <b-form-select id="input-1" v-model="form.Make" :options="makes" required />
        </b-form-group>

        <b-form-group id="input-group-2" label="Model:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.Model" placeholder="Enter model" required />
        </b-form-group>

        <b-form-group id="input-group-3" label="Derivative:" label-for="input-3">
            <b-form-input id="input-3" v-model="form.Derivative" placeholder="Enter derivative" required />
        </b-form-group>

        <b-form-group id="input-group-4" label="From date:" label-for="input-4">
            <b-form-datepicker id="input-4" v-model="form.From" class="mb-2" />
        </b-form-group>

        <b-form-group id="input-group-5" label="To date:" label-for="input-5">
            <b-form-datepicker id="input-5" v-model="form.To" class="mb-2" />
        </b-form-group>

        <b-form-group id="input-group-6" label="Tags:" label-for="input-6">
            <b-form-tags input-id="input-6" v-model="form.Tags" />
        </b-form-group>

        <!-- <b-form-file v-model="file1" :state="Boolean(file1)"  placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div> -->

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        Make: null,
        Model: '',
        Deravitive: '',
        From: '',
        To: '',
        Tags: [],
        Id: null
      },
      file1: null,
      makes: [
        { text: 'Select One', value: null },
        'Opel',
        'Fiat',
        'Isuzu',
        'BMW'
      ]
    };
  },
  created: function () {
    if (this.$route.query.id) {
      this.fetchVehicle(this.$route.query.id);
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault();
      const data = {
        Tags: this.form.Tags,
        Make: this.form.Make,
        Model: this.form.Model,
        Derivative: this.form.Derivative,
        Year_From: this.form.From,
        Year_To: this.form.To
      };
      if (this.form.Id === null) {
        this.$axios.$post('/api/play', data)
          .then((response) => {
            if (response.Id) {
              this.form.Id = response.Id;
            }
          })
          .catch((error) => { console.log(error) });
      }
      else {
        data.Id = this.form.Id;
        this.$axios.$patch('/api/play', data)
          .then((response) => {
            if (response.Id) {
              this.form.Id = response.Id;
            }
          })
          .catch((error) => { console.log(error) });
      }
    },
    onReset (event) {
      event.preventDefault();
      this.form.Make = null;
      this.form.Model = '';
      this.form.Deravitive = '';
      this.form.From = '';
      this.form.To = '';
      this.form.Tags = [];
      this.form.Id = null
    },
    fetchVehicle (id) {
      this.$axios.$get('/api/play?id=' + id)
        .then((response) => {
          if (response.id) {
            this.form.Id = response.id;
            this.form.Make = response.Make;
            this.form.Model = response.Model;
            this.form.Derivative = response.Derivative;
            this.form.From = response.Year_From;
            this.form.To = response.Year_To;
            this.form.Tags = response.Tags.split(',');
          }
        })
        .catch((error) => { console.log(error) });
    },
    uploadImage () {
      if (this.form.Id && this.file1) {
        const formData = new FormData();
        formData.append('file', this.file1);
        this.$axios.$post('/api/play/upload?id=' + this.form.Id, formData)
          .then((response) => {
            console.log(response.status);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
};
</script>
<style>
    div {
        margin: 5px;
    }
</style>
