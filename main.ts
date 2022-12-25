//% weight=0 color=#EC7505 icon="\uf0ad" block="microbiti2cesp32"
namespace microbiti2cesp32 {
      export enum analogRpin {
        A32 = 32,
        A33 = 33,
        A34 = 34,
        A35 = 35,
        A36 = 36,
	A39 = 39
     }
     
      export enum digitalWpin {
        D2 = 2,
	D4 = 4,
        D13 = 13,
        D16 = 16,
        D17 = 17,
        D18 = 18,
        D19 = 19,
        D21 = 21,
        D22 = 22,
        D23 = 23,
        D24 = 24,
        D25 = 25,
        D26 = 26,
        D27 = 27,
        D32 = 32,
	D33 = 33
     }
      
      export enum analogWpin {
        A2 = 2,
	A4 = 4,
        A13 = 13,
        A16 = 16,
        A17 = 17,
        A18 = 18,
        A19 = 19,
        A21 = 21,
        A22 = 22,
        A23 = 23,
        A24 = 24,
        A25 = 25,
        A26 = 26,
        A27 = 27,
        A32 = 32,
	A33 = 33
     }

	
   export enum digitalRpin {
        D2 = 2,
        D13 = 13,
        D16 = 16,
        D17 = 17,
        D18 = 18,
        D19 = 19,
        D21 = 21,
        D22 = 22,
        D23 = 23,
        D24 = 24,
        D25 = 25,
        D26 = 26,
        D27 = 27,
        D32 = 32,
	D33 = 33,
        D36 = 36,
	D39 = 39
     }	
	
      export enum type {
        INPUT = 2,
        OUTPUT = 1
     }
     export enum value {
        HIGH = 1,
        LOW = 0
     }
     let mqttmessage="";
     let mqtttopic="";
      
    //% blockId=setpinmode block="set esp32 digital pin %pin | for %XY"
    //% weight=101
    export function setpinmode(pin: digitalWpin, XY: type):void {
       sendi2cmessage("pinMode="+pin.toString()+","+XY.toString())    
    }
     
     
    //% blockId=setdigitalW block="set esp32 digital pin  %pin | value to %XY"
    //% weight=100
    export function setdigitalW(pin: digitalWpin, XY: value):void {
        sendi2cmessage("digitalWrite="+pin.toString()+","+XY.toString())    
    }
    
    //% blockId=setanalogW block="set esp32 digital pin  %pin | PWM value to %XY"
    //% weight=99
    export function setanalogW(pin: analogWpin, XY: number):void {
        sendi2cmessage("analogWrite="+pin.toString()+","+XY.toString())    
    }
	
    //% blockId=sendifttt block="send ifttt key %key | event %event | value1 %value1"
    //% weight=50
    export function sendifttt(key: string, event: string, value1: string):void {
        sendi2cmessage("ifttt="+key+","+event+","+value1)    
    }
	
    //% blockId=setdigitalR block="read esp32 digital pin  %pin value"
    //% weight=98
    export function setdigitalR(pin: digitalRpin):number {
        return parseFloat(receivei2cmessage("digitalRead="+pin.toString()))
    }

    //% blockId=setanalogR block="read esp32 analog pin  %pin value"
    //% weight=97 
    export function setanalogR(pin: analogRpin):number {
        return parseFloat(receivei2cmessage("analogRead="+pin.toString()))
    }   
	
    //% blockId=ReceiveMqtt block="receive mqtt"
    //% weight=97 
    export function ReceiveMqtt():void {
        let a=receivei2cmessage("mqttrec=")
	let strAry = a.split(',')
	mqtttopic=strAry[0]
        mqttmessage=strAry[1]
    }   

    //% blockId=ReceiveMqtt1 block="receive mqtt1"
    //% weight=97 
    export function ReceiveMqtt1():string {
        let a = receivei2cmessage("mqttrec=")
	if ( a.length > 1 )
	{
	sendi2cmessage("clearmqtt")
	} else
		a=""
        return a
    } 
	
    //% blockId=subMqtt block="Subscribe mqtt %topic"
    //% weight=97 
    export function subMqtt(topic: string):void {
         sendi2cmessage("sebmqtt="+topic)
    }
    //% blockId=ReceiveMqttTopic block="receive mqtt topic"
    //% weight=97 	
    export function ReceiveMqttTopic():string {
        return receivei2cmessage("mqttrect=")
    }  
    //% blockId=ReceiveMqttMessage block="receive mqtt message"
    //% weight=97 	
    export function ReceiveMqttMessage():string {
        return receivei2cmessage("mqttm=")
    }  
    //% blockId=sendmqtt block="send mqtt topic %topic | message %message "
    //% weight=56 
    export function sendmqtt(topic: string, message: string):void {
        sendi2cmessage("sendmqtt="+topic+","+message)
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
