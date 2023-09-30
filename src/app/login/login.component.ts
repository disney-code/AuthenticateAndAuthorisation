import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
invalidLogin:boolean=false

constructor(private router:Router,
  private authService:AuthService,
  private route: ActivatedRoute){}

signIn(credentials:any){
  let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
  this.authService.login(credentials)
  .subscribe(result=>{
    console.log("below is the result:")
    console.log(result)
    if (result){
      this.router.navigate(['/'+returnUrl[0]||'/' ])
      // this.router.navigate(['/'+returnUrl[0] ])
        //this.router.navigate(['/'+this.returnUrl ])
    }
    
  else{
    console.log("else got executed")
    this.invalidLogin=true;
  }
  
  })
}

}

