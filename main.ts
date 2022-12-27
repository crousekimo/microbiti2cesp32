//% weight=0 color=#EC7505 icon="\uf0ad" block="microbiti2cesp32"
namespace microbiti2cesp32 {

     export enum openweathermapmenu {
        Lon = 1,
        Lat = 2,
        Temperature = 3,
        Pressure = 4,
        Humidity = 5,
	WindSpeed = 6
     }

     let mqttmessage="";
     let mqtttopic="";
     
     export enum value555 {
        field1 = 1 ,
        field2 = 2,
        field3 = 3,
        field4 = 4,
        field5 = 5,
        field6 = 6,
        field7 = 7,
        field8 = 8
     }
    //% group="1.Setup"
    //% blockId=setWiFi block="Set WIFI | SSID %SSID| Pass %PASS"
    //% weight=101
    //% blockExternalInputs = 1
    export function setWiFi(SSID: string, PASS: string) {
        sendi2cmessage("setwifi="+SSID+","+PASS+",1")
    }
    //% group="2.MQTT"  
    //% blockId=subMqtt block="Subscribe mqtt %topic"
    //% weight=97 
    export function subMqtt(topic: string):void {
         sendi2cmessage("sebmqtt="+topic)
    }
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttTopic block="receive mqtt topic"
    //% weight=97 	
    export function ReceiveMqttTopic():string {
        return receivei2cmessage("mqttrect=").substr(1)
    }  
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttMessage block="receive mqtt message"
    //% weight=97 	
    export function ReceiveMqttMessage():string {
        return receivei2cmessage("mqttrecm=").substr(1)
    }  
    //% group="2.MQTT"  
    //% blockId=sendmqtt block="send mqtt topic %topic | message %message "
    //% weight=56 
    export function sendmqtt(topic: string, message: string):void {
        sendi2cmessage("sendmqtt="+topic+","+message)
    }  
    //% group="3.Line notify"  
    //% blockId=linetoken block="Line notify token %token "
    //% weight=56 
    export function linetoken(token: string):void {
        sendi2cmessage("linetoken="+token)
    }  
    //% group="3.Line notify"  
    //% blockId=linemessage block="Line notify message %message "
    //% weight=56 
    export function linemessage(message: string):void {
        sendi2cmessage("linemessage="+message)
    }  
    //% group="3.Line notify"  
    //% blockId=linesticker block="Line notify sticker message %message | packageID %packageID | stickerID %stickerID "
    //% weight=56 
    export function linesticker(message: string,packageID: number, stickerID: number):void {
        sendi2cmessage("linesticker="+message+","+packageID.toString()+","+stickerID.toString())
    }  
  //% group="4.OpenWeatherMap"  	
    //% blockId=openweathermapsetup block="OpenWeatherMap key %key "
    //% weight=56 
    export function openweathermapsetup(key: string):void {
        sendi2cmessage("openweathermapsetup="+key)
    }  
    //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapcity block="OpenWeatherMap city %city "
    //% weight=56 
    export function openweathermapcity(city: string):void {
        sendi2cmessage("openweathermapcity="+city)
    }  
  //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapreturn block="OpenWeatherMap option %option "
    //% weight=56 
    export function openweathermapreturn(option: openweathermapmenu):number {
        return parseFloat(receivei2cmessage("openweathermapreturn="+option.toString()).substr(1))
    } 

	
    //% group="5.Thingspeak"      
    //% blockId=thingspeak1 block="Connect to Thingspeak key %key | Write Field1 value %value1 "
    //% weight=101 
    export function thingspeak1(key:string, value1: string):void {
        sendi2cmessage("t\="+key+","+value1)
        basic.pause(4000)
    }
    //% group="5.Thingspeak"            
    //% blockId=thingspeak4 
    //% block="Connect to Thingspeak key %key | Write Fields value | Field1 value %value1 || Field2 value %value2 Field3 value %value3 Field4 value %value4 Field5 value %value5 Field6 value %value6 Field7 value %value7"
    //% weight=101  
    //% blockExternalInputs=1
    export function thingspeak4(key:string, value1: number, value2?:number, value3?:number, value4?:number, value5?:number, value6?:number, value7?:number):void {    
        let b=""
        let i
        let value12:number[]=[value1,value2,value3,value4,value5,value6,value7]
        for (i=0;i<7;i++)
        {
              if (i==0)
              {
                    b=value12[0].toString()
              }else if (value12[i]!=null)
              {
                    let c=i+1
                    b=b+"\&field"+c.toString()+"="+value12[i].toString()
              }
        }
        sendi2cmessage("t\="+key+","+b)
        basic.pause(8000)
    }
    //% group="5.Thingspeak"      
    //% blockId=thingspeak2 block="Connect to Thingspeak key %key | Write Fields value %value1 "
    //% weight=101
    export function thingspeak2(key:string, value1: number[]):void {
        let a=value1.length
        let b=""
        let i
        for (i=0;i<a;i++)
        {
              if (i==0)
              {
                    b=value1[0].toString()
              }else
              {
                    let c=i+1
                    b=b+"\&field"+c.toString()+"="+value1[i].toString()
              }
        }
        sendi2cmessage("t\="+key+","+b)
        basic.pause(8000)
    }

      
     //% group="5.Thingspeak"  
     //% blockId=thingspeak3 block="Connect to Thingspeak Channel ID %key | Read %value1 value"
    //% weight=101
    export function thingspeak3(key:number, value1: value555): number {
        let a=receivei2cmessage("tt="+convertToText(key)+","+convertToText(value1)+",1")
        return parseFloat(a)
    }     

	
     //% group="6.IFTTT"  
    //% blockId=sendifttt block="send ifttt key %key | event %event | value1 %value1"
    //% weight=50
    export function sendifttt(key: string, event: string, value1: string):void {
        sendi2cmessage("ifttt="+key+","+event+","+value1)    
    }
	
	
    //% group="7.Google表單寫入試算表"  
    //% blockId=googleformans block="Google From write ans number %ansnumber ans %ans "
    //% weight=56 
    export function googleformans(ansnumber: number, ans: string):void {
        sendi2cmessage("googleformans="+ans_number.toString()+","+ans)
    }  
	
    //% group="7.Google表單寫入試算表"  
    //% blockId=googleformurl block="Google From write url %url "
    //% weight=56 
    export function googleformurl(url: string):void {
        sendi2cmessage("googleformurl="+url)
    }  
	
	
	
    function sendi2cmessage(command: string):void {
        for (let index = 0; index <= command.length-1; index++) {
        	pins.i2cWriteNumber(
        	8,
        	command.charCodeAt(index),
        	NumberFormat.Int8LE,
        	false
        	)
        }
        pins.i2cWriteNumber(
	8,
	10,
	NumberFormat.Int8LE,
	false
	)
    } 
    

	
	
	
    function receivei2cmessage(command: string):string {
    let i2cmessage2 = ""
    let aa: number[] = []
    for (let index2 = 0; index2 <= command.length-1; index2++) {
        pins.i2cWriteNumber(
        8,
        command.charCodeAt(index2),
        NumberFormat.Int8LE,
        false
        )
    }
    pins.i2cWriteNumber(
    8,
    10,
    NumberFormat.Int8LE,
    false
    )
    i2cmessage2=""
    for (let index = 0; index <= 118; index++) {
        let dd = pins.i2cReadBuffer(8,952,false)
        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }
}
