import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Router} from "@angular/router";

import { AuthService } from '../../service/auth.service';
import { ScrollLockService } from '../../service/scroll-lock.service';
import {TokenVerifyGuard} from "../../guard/token-verify.guard";

import { load } from 'recaptcha-v3'
import {element} from "protractor";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private guard:TokenVerifyGuard) { }

  ngOnInit() {

  }

}
