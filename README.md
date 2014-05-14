The OpenShift `nodejs` cartridge documentation can be found at:

https://github.com/openshift/origin-server/tree/master/cartridges/openshift-origin-cartridge-nodejs/README.md

This is a sample application based on nodejs + express + faye hosted on Openshift
To use it with your app on openshift do these changes

          script(src='http://chat-yummyfoods.rhcloud.com/faye/client.js')
          var client = new Faye.Client('http://chat-yummyfoods.rhcloud.com:8000/faye',{
						                    timeout: 20
					                       });

          var Socket = new WebSocket('ws://chat-yummyfoods.rhcloud.com:8000' );
          client.disable(Socket);
