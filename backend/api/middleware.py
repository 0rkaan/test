from django.shortcuts import redirect
import logging

logger = logging.getLogger(__name__)

class SSOSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.debug("Middleware procesando ruta: %s", request.path)
        # Excluir rutas que no requieren verificación de sesión
        excluded_paths = ['/api/sso/inter/', '/api/sso/login/', '/api/sso/check/']
        
        if not request.path in excluded_paths:
            logger.debug("Ruta no excluida, verificando sesión SSO")
            # Verificar si la sesión SSO existe
            if not request.session.get('sso', False):
                logger.debug("No hay sesión SSO, redirigiendo")
                # Limpiar la sesión
                request.session.flush()
                # Redirigir a inter.php (ahora será nuestra vista inter)
                return redirect('https://huemultest.utalca.cl/tst/inter.php')
        
        response = self.get_response(request)
        return response