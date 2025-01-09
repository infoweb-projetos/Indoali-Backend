import { Injectable,CanActivate,ExecutionContext,ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export class UserOwnershipGuard implements CanActivate {
    //constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const userIdFromToken = user.dados.id; // id no token
      const userIdFromRequest = +request.params.id; // id do usuário na rota
       //console.log(userIdFromToken)
       //console.log(userIdFromRequest)
    
      if (userIdFromToken !== userIdFromRequest) {
        throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
      }
  
      return true;
    }
}