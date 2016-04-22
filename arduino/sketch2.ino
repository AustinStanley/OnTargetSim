#define numMics 3
#define silenceSeconds 1
#define dropMicroSeconds 5000
#define DEBUG_MODE 0

#define getMicISR(n) pin ## n ## ISR
#define declareMicISR(n); void getMicISR(n)() { if(!times[n]) { times[n] = micros(); } }
#define setupMicISR(mic, n) pinMode(n, INPUT); attachInterrupt(digitalPinToInterrupt(n), getMicISR(mic), CHANGE);
#define DEBUG(msg) if(DEBUG_MODE) { Serial.println(msg); }

unsigned long volatile times[numMics];
unsigned long volatile wallTime;

unsigned char stage = 0;
unsigned long silencePeriod = silenceSeconds * 1000000;
unsigned long dropPeriod = dropMicroSeconds;

void sendData() {
  int i;
  for(i = 0; i < numMics; i++) {
    Serial.print(i);
    Serial.print(":");
    Serial.print(times[i]);
    Serial.println();
  }
}

int getReportCount() {
  int n = 0;
  int i;
  for(i = 0; i < numMics; i++) {
    if(times[n]) {
      ++n;
    }
  }
  return n;
}

long getMaxDiff() {
  long max = times[0];
  long min = times[0];
  int i;
  for(i = 0; i < numMics; i++) {
    if(times[i] < min) {
      min = times[i];
    }
    if(times[i] > max) {
      max = times[i];
    }
  }
  return max - min;
}

void clearTimes() {
  int i;
  for(i = 0; i < numMics; i++) {
    times[i] = 0;
  }
}

declareMicISR(0);
declareMicISR(1);
declareMicISR(2);

void setup() {
  Serial.begin(9600);
  setupMicISR(0, 2);
  setupMicISR(1, 3);
  setupMicISR(2, 21);
}

void loop() {
  int reportCount = getReportCount();
  switch(stage) {
    case 0:
      if(!reportCount) {
        break;
      }
      wallTime = micros();
      stage = 1;
      //DEBUG("Mic has been heard");
    case 1:
      if(reportCount == numMics /*&& getMaxDiff() < dropPeriod*/) {
        sendData();
        stage = 2;
        //DEBUG("Every mic has been heard");
      } else {
        if(micros() - wallTime > dropPeriod) {
          clearTimes();
          stage = 0;
          //DEBUG("Not enough mics have been heard - dropping");
        }
        break;
      }
    case 2:
      if(reportCount) {
        wallTime = micros();
        clearTimes();
        //DEBUG("Waiting for silence");
      } else if(micros() - wallTime > silencePeriod) {
        stage = 0;
        //DEBUG("Quiet - starting new cycle");
      }
      break;
  }
}

