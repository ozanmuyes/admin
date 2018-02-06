<template>
  <div>
    <el-form
      v-if="!isConnected"
      label-width="120px"
      :model="connectionForm"
      ref="connectionForm"
    >
      <el-form-item label="URL">
        <el-input v-model="connectionForm.url"></el-input>
      </el-form-item>

      <el-button
        class="full-width"
        @click="onConnectClick"
        type="success"
      >
        Connect
      </el-button>
    </el-form>

    <el-form
      v-else
      label-width="120px"
      :model="commandForm"
      ref="commandForm"
    >
      <el-form-item label="Command">
        <el-input v-model="commandForm.command"></el-input>
      </el-form-item>

      <el-form-item label="Arguments">
        <el-input type="textarea" v-model="commandForm.args"></el-input>
      </el-form-item>

      <el-form-item label="Response">
        <el-input type="textarea" v-model="commandForm.response" readonly></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="onSubmitClick"
          :disabled = "!this.isLoggedIn"
          type="primary"
        >
          Send
        </el-button>
        <el-button>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  import store from 'store';

  export default {
    data() {
      return {
        isConnected: false,
        socket: null,
        isLoggedIn: false,
        connectionForm: {
          url: 'http://localhost:3030',
          //
        },
        commandForm: {
          command: 'kick',
          args: '[1]',
          response: '',
        },
        //
      };
    },
    methods: {
      onConnectClick() {
        // TODO Connect to the websocket server
        this.socket = io(this.connectionForm.url, {
          reconnectionAttempts: 1, // TODO Revert it to 3
          pongTimeout: 600000000, // TODO Remove before flight
        });

        this.socket.on('error', (error) => {
          this.isConnected = false;

          console.log(`ERROR | ${error.message || error}`);
        });

        this.socket.on('connect', () => {
          // TODO TR sanıyorum ki karşı tarafla bağlantı kopup
          //      tekrar gelince bir anomali oluşuyor. nedeni
          //      burada, aşağıdaki kodlarla çözülebilir mi?
//           if (this.socket) {
// console.log('!!! ERROR !!! Wtf is this really?');
//             // As in 'disconnect'
//             this.isConnected = false;
//             //

//             return;
//           }

          this.isConnected = true;

          setTimeout((thisComponent) => {
            // TODO Login via user credentials ('access_token' in this app)
            const access_token = store.state.user.access_token; // eslint-disable-line camelcase

            thisComponent.socket.emit('login', { access_token }, (response) => {
              if (response) {
                this.isLoggedIn = true;

                //
              } else {
                this.isLoggedIn = false;

                //
              }
            });

            //
          }, 100, this);
        });

        this.socket.on('disconnect', () => {
          this.isConnected = false;
          // this.socket = null;
          this.isLoggedIn = false;
          // TODO Reset other data here

          //
        });

        // this.socket.on('custom event', () => {});
      },
      onSubmitClick() {
        const command = this.commandForm.command;
        const args = this.commandForm.args;

        this.commandForm.command = '';
        this.commandForm.args = '';

        const commandObj = JSON.stringify({
          event: command,
          args, // array or object
          //
        });

        this.socket.emit('command', commandObj, (response) => {
          console.log(`Command response: '${response}'`);

          //
        });
      },
    },
    //
  };
</script>

<style module>
  .full-width {
    width: 100%;
  }
</style>
