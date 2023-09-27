// create fakebackend 
//this fakebackend shld be included in app.module.ts under the providers
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	private jwT:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
  
	intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
if (req.url.endsWith('/api/authenticate') && req.method==='POST'){
	console.log("congrats if you see this")
	
const expectedBody={
	email:"mosh@domain.com",
	password:"1234"
}

console.log(expectedBody)
if (JSON.stringify(req.body)===JSON.stringify(expectedBody)){
	console.log("req body equals hardcoded")
	const successResponse=new HttpResponse({
		 status:200,
		 body:{token: this.jwT}
	})

	return new Observable((observer)=>{
		observer.next(successResponse);
		observer.complete();
	})
}

else{
	const failedResponse=new HttpResponse({
		status:400
       })

       return new Observable((observer) => {
	observer.next(failedResponse);
	observer.complete();
      });
}

}


if(req.url.endsWith('/api/orders') && req.method ==='GET'){
	if (req.headers.has('Authorization')) {
		const jwtToken = req.headers.get('Authorization');
	if (jwtToken===this.jwT){
		const ordersResponse = new HttpResponse({
			status: 200,
			body: { data: ['order1', 'order2'] }, // Mock response data
		      });
		return new Observable((observer) => {
			observer.next(ordersResponse);
			observer.complete();
		      });
	}
	else{
		const unauthorizedResponse = new HttpResponse({
			status: 401,
			body: { error: 'Unauthorized' },
		      });
		
		      return new Observable((observer) => {
			observer.next(unauthorizedResponse);
			observer.complete();
		      });
	}

}
else {
	// Respond with a 401 Unauthorized if the Authorization header is missing
	const unauthorizedResponse = new HttpResponse({
	  status: 401,
	  body: { error: 'Unauthorized' },
	});
    
	return new Observable((observer) => {
	  observer.next(unauthorizedResponse);
	  observer.complete();
	});
      }
}

return next.handle(req)
	}
}