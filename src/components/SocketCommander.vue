<template>
  <div>
    <el-form
      v-if="!isConnected || !isLoggedIn"
      label-width="120px"
      :model="connectionForm"
      ref="connectionForm"
    >
      <el-form-item label="URL">
        <el-input
          v-model="connectionForm.url"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-switch
          active-color="#13ce66"
          active-text="Auto Login"
          inactive-color="#ff4949"
          v-model="connectionForm.autoLogin"
        >
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          class="full-width"
          @click="onConnectClick"
          type="success"
        >
          Connect
        </el-button>
      </el-form-item>
    </el-form>

    <el-form
      v-else
      label-width="120px"
      :model="commandForm"
      ref="commandForm"
    >
      <el-form-item label="Command">
        <el-input
          v-model="commandForm.command"
        ></el-input>
      </el-form-item>

      <el-form-item label="Arguments">
        <el-input
          class="arguments"
          v-model="commandForm.args"
          :rows="1"
          type="textarea"
        ></el-input>
      </el-form-item>

      <el-form-item label="Response">
        <el-input
          class="response"
          v-model="commandForm.response"
          type="textarea"
          autosize
          readonly
        ></el-input>
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
  /* eslint-disable max-len */

  import io from 'socket.io-client';

  import { onConnectionErrored } from 'api';
  import store from 'store';

  export default {
    data() {
      return {
        isConnected: false,
        socket: null,
        isLoggedIn: false,
        connectionForm: {
          url: 'http://localhost:3030',
          autoLogin: true,
          //
        },
        commandForm: {
          command: '',
          args: '',
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

          // TODO Call `tryToLogin`
          if (this.connectionForm.autoLogin) {
            setTimeout((thisComponent) => {
              this.tryToLogin();
              // /* eslint-disable no-param-reassign */
              // // TODO Login via user credentials ('access_token' in this app)
              // const access_token = store.state.user.access_token; // eslint-disable-line camelcase
              // // debugger;
              // thisComponent.socket.emit('login', { access_token }, (response) => {
              // // debugger;
              //   if (response) {
              //     if (response === true) {
              //       thisComponent.isLoggedIn = true;
              //       //
              //     } else if (response.name && response.message) {
              //       // If it's an error
              // // debugger;
              //       thisComponent.isLoggedIn = false;
              //       //

              //       // TODO Refresh the access token
              //       onConnectionErrored({
              //         // Synthetic error object
              //         isSynthetic: true,
              //         response: {
              //           status: 403,
              //           data: {
              //             error: {
              //               code: '13',
              //               //
              //             },
              //             //
              //           },
              //           //
              //         },
              //         //
              //       }, (newAccessToken) => { // TODO [WSMSTRFRSHTKNNDRTRYLGN-2]
              //   console.log(`Got new access token: '${newAccessToken}'`);
              //         // TODO Send login event again with new access token
              //       });
              //     }
              //   } else {
              //     // No return, nothing has changed
              //     thisComponent.isLoggedIn = false;

              //     //
              //   }
              // });

              // //
              // /* eslint-enable no-param-reassign */
            }, 100, this);
          } else {
            // TODO One-off command upon login after page refresh
//             this.socket.emit('sock ls', {}, (response) => {
// debugger;
//               console.log(response);
//               //
//             });
          }
        });

        this.socket.on('disconnect', () => {
          this.isConnected = false;
          // this.socket = null;
          this.isLoggedIn = false;
          // TODO Reset other data here

          //
        });

//         this.socket.on('pong', (pong) => {
//           // FIXME This callback fires time to time
// debugger;
//           this.commandForm.response = pong;
//         });

        this.socket.on('message', ({ user, message }) => {
          console.log(`MESSAGE | USER#${user.id} ('${user.name}'): ${message}`);

          // TODO Show message on the application (on the AppNavbar, like a notification)
        });

        // this.socket.on('custom event', () => {});
      },
      onSubmitClick() {
        const command = this.commandForm.command;
        const args = this.commandForm.args;

        this.commandForm.response = '';
        // this.commandForm.command = '';
        // this.commandForm.args = '';

        const commandObj = JSON.stringify({
          event: command,
          args, // array or object
          //
        });

        this.socket.emit(command, args, (response) => {
        // this.socket.emit('command', commandObj, (response) => {
          // console.log(`Command response: '${response}'`);

          let responseStr = '';
          if (typeof response === 'string') {
            responseStr = response;
          } else {
// debugger;
            responseStr = JSON.parse(response);
          }

// console.log(`Response to command '${command}' (${args.length === 0 ? 'without ' : 'with '} arguments):\n'${responseStr}'`);
// console.log(`\`response\` setting to: '${responseStr}'`);
          this.commandForm.response = responseStr;
        });
      },
      tryToLogin() {
        /* eslint-disable no-param-reassign */
        // TODO Login via user credentials ('access_token' in this app)
        const access_token = store.state.user.access_token; // eslint-disable-line camelcase
        // debugger;
        this.socket.emit('login', { access_token }, (response) => {
        // debugger;
          if (response) {
            if (response === true) {
              this.isLoggedIn = true;
              //
            } else if (response.name && response.message) {
              // If it's an error
        // debugger;
              this.isLoggedIn = false;
              //

              // TODO Refresh the access token
              onConnectionErrored({
                // Synthetic error object
                isSynthetic: true,
                response: {
                  status: 403,
                  data: {
                    error: {
                      code: '13',
                      //
                    },
                    //
                  },
                  //
                },
                //
              }, (newAccessToken) => { // TODO [WSMSTRFRSHTKNNDRTRYLGN-2]
          console.log(`Got new access token: '${newAccessToken}'`);
                return this.tryToLogin();
                // TODO Send login event again with new access token
              });
            }
          } else {
            // No return, nothing has changed
            this.isLoggedIn = false;

            //
          }
        });

        //
        /* eslint-enable no-param-reassign */
      },
    },
    //
  };
</script>

<style module>
  .full-width {
    width: 100%;
  }

  .response {
    /**/
  }
</style>
