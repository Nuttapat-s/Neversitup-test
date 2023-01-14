import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "./user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        const token = await this.userService.login(username, password);

        if (!token) {
            throw new UnauthorizedException();
        }

        return token;
    }
}