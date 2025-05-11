<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Cache Store
    |--------------------------------------------------------------------------
    |
    | Este valor controla el almacenamiento de caché predeterminado que se 
    | utilizará en tu aplicación. Puedes cambiar este valor a "file", 
    | "database", "redis", entre otros.
    |
    */

    'default' => env('CACHE_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Cache Stores (Almacenamientos de Cache)
    |--------------------------------------------------------------------------
    |
    | Aquí puedes definir todos los "stores" de caché que tu aplicación 
    | utilizará. Cada driver representa un método diferente de almacenamiento 
    | de caché (archivo, base de datos, redis, etc).
    |
    | Drivers soportados: "array", "database", "file", "memcached",
    |                     "redis", "dynamodb", "octane", "null"
    |
    */

    'stores' => [

        // ✅ Almacenamiento en Archivo (File)
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],

        // ✅ Almacenamiento en Base de Datos (Database)
        'database' => [
            'driver' => 'database',
            'connection' => env('DB_CONNECTION', 'mysql'),
            'table' => 'cache',
            'lock_connection' => env('DB_CONNECTION', 'mysql'),
        ],

        // ✅ Almacenamiento en Memoria (Array) - Solo para Pruebas
        'array' => [
            'driver' => 'array',
            'serialize' => false,
        ],

        // ✅ Almacenamiento en Redis (Cache Rápido)
        'redis' => [
            'driver' => 'redis',
            'connection' => env('REDIS_CACHE_CONNECTION', 'cache'),
            'lock_connection' => env('REDIS_CACHE_LOCK_CONNECTION', 'default'),
        ],

        // ✅ Almacenamiento en Memcached (Cache Distribuido)
        'memcached' => [
            'driver' => 'memcached',
            'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
            'sasl' => [
                env('MEMCACHED_USERNAME'),
                env('MEMCACHED_PASSWORD'),
            ],
            'options' => [
                // Opciones de Memcached
            ],
            'servers' => [
                [
                    'host' => env('MEMCACHED_HOST', '127.0.0.1'),
                    'port' => env('MEMCACHED_PORT', 11211),
                    'weight' => 100,
                ],
            ],
        ],

        // ✅ Almacenamiento en DynamoDB (AWS)
        'dynamodb' => [
            'driver' => 'dynamodb',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
            'endpoint' => env('DYNAMODB_ENDPOINT'),
        ],

        // ✅ Almacenamiento para Laravel Octane (Alto Rendimiento)
        'octane' => [
            'driver' => 'octane',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Key Prefix (Prefijo de Cache)
    |--------------------------------------------------------------------------
    |
    | Este prefijo se aplica a todas las claves de caché para evitar 
    | conflictos si tienes múltiples aplicaciones usando la misma cache.
    |
    */

    'prefix' => env('CACHE_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_cache_'),

];
