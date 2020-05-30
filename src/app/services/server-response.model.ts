export interface ServerResponseMyPoll {
   status: 'idle' | 'waiting-reponse' | 'success' | 'error';
   response: any;
}
