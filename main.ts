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

     export enum ntptime {
        Your = 0,
        Month = 1,
        Day = 2,
        Hour = 3,
        Min = 4,
	Sec = 5
     }
     let datelist: string[] = []
	
     let nptgettime="";	
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
     let aa=0;
     function check()
     {
	     if (aa==0)
	     {
		     basic.pause(6000)
		     aa=1
	     }
     }
    //% group="1.Setup"
    //% blockId=setWiFi block="Set WIFI | SSID %SSID| Pass %PASS"
    //% weight=101
    //% blockExternalInputs = 1
    export function setWiFi(SSID: string, PASS: string):void {
	check()
        sendi2cmessage("setwifi="+SSID+","+PASS+",1")
	basic.pause(2000)
    }
    //% group="1.Setup"
    //% blockId=iprequest block="Read WIFI IP"
    //% weight=50
    //% blockExternalInputs = 1
    export function iprequest():string {
	check()
        let a=receivei2cmessage("iprequest=").substr(1)
   	if (!a.includes("iprequest"))
           a=receivei2cmessage("iprequest=").substr(1)
	basic.pause(100)
        a=a.substr(9)
	return a
    }
    //% group="2.MQTT"  
    //% blockId=subMqtt block="Subscribe mqtt %topic"
    //% weight=100 
    export function subMqtt(topic: string):void {
	 check()
         sendi2cmessage("sebmqtt="+topic)
	 basic.pause(200)
    }
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttTopic block="receive mqtt topic"
    //% weight=98	
    export function ReceiveMqttTopic():string {
        let a=receivei2cmessage("mqttrect=").substr(1)
	basic.pause(100)
   	if (!a.includes("mqttrecm"))
        a=receivei2cmessage("mqttrect=").substr(1)
	basic.pause(100)
        a=a.substr(8)
	return a
    }  
    //% group="2.MQTT"  
    //% blockId=ReceiveMqttMessage block="receive mqtt message"
    //% weight=97 	
    export function ReceiveMqttMessage():string {
        let a=receivei2cmessage("mqttrecm=").substr(1)
	basic.pause(300)
	if (!a.includes("mqttrecm"))
        a=receivei2cmessage("mqttrecm=").substr(1)
	basic.pause(300)
	a=a.substr(8)
        return a
    }  
    //% group="2.MQTT"  
    //% blockId=sendmqtt block="send mqtt topic %topic | message %message "
    //% weight=56 
    export function sendmqtt(topic: string, message: string):void {
        sendi2cmessage("sendmqtt="+topic+","+message)
	basic.pause(200)
    }  
    //% group="3.Line notify"  
    //% blockId=linetoken block="Line notify token %token "
    //% weight=100 
    export function linetoken(token: string):void {
	check()
        sendi2cmessage("linetoken="+token)
	basic.pause(200)
    }  
    //% group="3.Line notify"  
    //% blockId=linemessage block="Line notify message %message "
    //% weight=57 
    export function linemessage(message: string):void {
        sendi2cmessage("linemessage="+message)
	basic.pause(200)
    }  
    //% group="3.Line notify"  
    //% blockId=linesticker block="Line notify sticker message %message | packageID %packageID | stickerID %stickerID "
    //% weight=56 
    export function linesticker(message: string,packageID: number, stickerID: number):void {
        sendi2cmessage("linesticker="+message+","+packageID.toString()+","+stickerID.toString())
	basic.pause(200)
    }  
  //% group="4.OpenWeatherMap"  	
    //% blockId=openweathermapsetup block="OpenWeatherMap key %key "
    //% weight=99 
    export function openweathermapsetup(key: string):void {
	check()
        sendi2cmessage("openweathermapsetup="+key)
	basic.pause(200)
    }  
    //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapcity block="OpenWeatherMap city %city "
    //% weight=45
    export function openweathermapcity(city: string):void {
        sendi2cmessage("openweathermapcity="+city)
	basic.pause(2000)
    }  
  //% group="4.OpenWeatherMap"  
    //% blockId=openweathermapreturn block="OpenWeatherMap option %option "
    //% weight=20 
    export function openweathermapreturn(option: openweathermapmenu):number {
        let a=receivei2cmessage("openweathermapreturn="+option.toString()).substr(1)
	basic.pause(100)
   	if (!a.includes("openweathermapreturn"))
        a=receivei2cmessage("openweathermapreturn="+option.toString()).substr(1)
	basic.pause(100)
        a=a.substr(20) 
	return parseFloat(a)
    } 

	
    //% group="5.Thingspeak"      
    //% blockId=thingspeak1 block="Connect to Thingspeak key %key | Write Field1 value %value1 "
    //% weight=101 
    export function thingspeak1(key:string, value1: string):void {
        sendi2cmessage("t="+key+","+value1)
	basic.pause(200)    
    }
	/*
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
                    b=b+"&field"+c.toString()+"="+value12[i].toString()
              }
        }
        sendi2cmessage("t="+key+","+b)
	basic.pause(200)
    }
    */
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
                    b=b+"&field"+c.toString()+"="+value1[i].toString()
              }
        }
        sendi2cmessage("t="+key+","+b)
	basic.pause(200)
    }

      
     //% group="5.Thingspeak"  
     //% blockId=thingspeak3 block="Connect to Thingspeak Channel ID %key | Read %value1 value"
    //% weight=101
    export function thingspeak3(key:number, value1: value555): string {
        sendi2cmessage("tt="+convertToText(key)+","+convertToText(value1))
	basic.pause(2000)
        let a=receivei2cmessage("ttt=").substr(1)
	if (!a.includes("ttt"))
	{
           a=receivei2cmessage("ttt=").substr(1)
	   basic.pause(200)
	}
        a=a.substr(3)
        return a
    }     

	
     //% group="6.IFTTT"  
    //% blockId=sendifttt block="send ifttt key %key | event %event | value1 %value1 | value2 %value2 | value3 %value3"
    //% weight=50
    export function sendifttt(key: string, event: string, value1: string, value2: string, value3: string):void {
	value1=value1+"&value2="+value2+"&value3="+value3;
        sendi2cmessage("ifttt="+key+","+event+","+value1) 
	basic.pause(200)
    }

	
     //% group="7.NTP"  
    //% blockId=ntpsetup block="NTP setup"
    //% weight=70
    export function ntpsetup():void {
	check()
        sendi2cmessage("ntps=") 
	basic.pause(200)
    }
	
     //% group="7.NTP"  
    //% blockId=ntpget block="ntpget"
    //% weight=50
    export function ntpget():void {
        sendi2cmessage("ntpget1=")
	basic.pause(2000)
	nptgettime=receivei2cmessage("ntpget2=").substr(1)
	if (!nptgettime.includes("ntpget2"))
	        nptgettime=receivei2cmessage("ntpget2=").substr(1)
        nptgettime=nptgettime.substr(7)
	datelist=nptgettime.split(",")
    }
	
    //% group="7.NTP"  
    //% blockId=ntpgettime block="read %time1"
    //% weight=30
    export function ntpgettime(time1: ntptime):number {
        return parseFloat(datelist[time1])
    }

     //% group="8.google"  
    //% blockId=google1 block="set google form question %google_number as %google_ans" 
    //% weight=70
    export function google1(google_number: number, google_ans: string):void {
        sendi2cmessage("google1="+convertToText(google_number)+","+google_ans)
	basic.pause(200)
    }
	
    //% group="8.google"  
    //% blockId=google2 block="set google form url as %google_url" 
    //% weight=70
    export function google2(google_url: string):void {
        sendi2cmessage("google2="+convertToText(google_url))
	basic.pause(200)
    }
	
     //% group="8.google"  
    //% blockId=google block="Send to Google form"
    //% weight=30
    export function google():void {
        sendi2cmessage("googler=") 
	basic.pause(200)
    }
	
     //% group="8.google"  
    //% blockId=googler block="get google sheet id %googleid row %googlerow col %googlecol"
    //% weight=30
    export function googler(googleid: string, googlerow: string, googlecol: number):string {
        let a=receivei2cmessage2("googler="+googleid+","+googlerow+","+convertToText(googlecol)).substr(1)
	basic.pause(1000)
   	if (!a.includes("googler"))
	{
           a=receivei2cmessage("googler=").substr(1)
	   basic.pause(1000)
	}
        a=a.substr(7)	    
	return a
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
    basic.pause(500)
    i2cmessage2=""
    let dd = pins.i2cReadBuffer(8,952,false)
    for (let index = 0; index <= 718; index++) {

        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }

    function receivei2cmessage2(command: string):string {
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
    basic.pause(2000)
    i2cmessage2=""
    let dd = pins.i2cReadBuffer(8,952,false)
    for (let index = 0; index <= 718; index++) {
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
