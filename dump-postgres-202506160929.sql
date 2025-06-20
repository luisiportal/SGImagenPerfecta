PGDMP  '        	            }           postgres    17.4    17.4 �    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            h           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE postgres;
                     postgres    false            i           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    5224            �            1259    74263    ofertas    TABLE     �  CREATE TABLE public.ofertas (
    id_oferta integer NOT NULL,
    nombre_oferta character varying(255),
    precio_venta numeric(10,2),
    descripcion text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    cantidad_fotos integer NOT NULL,
    locacion character varying(255),
    transportacion boolean,
    cambios_ropa integer
);
    DROP TABLE public.ofertas;
       public         heap r       postgres    false            �            1259    74262    ofertas_id_oferta_seq    SEQUENCE     �   CREATE SEQUENCE public.ofertas_id_oferta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.ofertas_id_oferta_seq;
       public               postgres    false    218            j           0    0    ofertas_id_oferta_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.ofertas_id_oferta_seq OWNED BY public.ofertas.id_oferta;
          public               postgres    false    217            �            1259    98500    ofertas_personalizadas    TABLE     �   CREATE TABLE public.ofertas_personalizadas (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 *   DROP TABLE public.ofertas_personalizadas;
       public         heap r       postgres    false            �            1259    98499    ofertas_personalizadas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ofertas_personalizadas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.ofertas_personalizadas_id_seq;
       public               postgres    false    226            k           0    0    ofertas_personalizadas_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.ofertas_personalizadas_id_seq OWNED BY public.ofertas_personalizadas.id;
          public               postgres    false    225            �            1259    98507    ofertas_servicios    TABLE     2  CREATE TABLE public.ofertas_servicios (
    id integer NOT NULL,
    id_servicio integer NOT NULL,
    id_oferta_personalizada integer NOT NULL,
    cantidad integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "totalServicio" numeric(10,2)
);
 %   DROP TABLE public.ofertas_servicios;
       public         heap r       postgres    false            �            1259    98506    ofertas_servicios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ofertas_servicios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.ofertas_servicios_id_seq;
       public               postgres    false    228            l           0    0    ofertas_servicios_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.ofertas_servicios_id_seq OWNED BY public.ofertas_servicios.id;
          public               postgres    false    227            �            1259    74281    reservas    TABLE     �  CREATE TABLE public.reservas (
    id_reserva integer NOT NULL,
    nombre_cliente character varying(255),
    apellidos character varying(255),
    ci character varying(255),
    descripcion_oferta text,
    precio_venta_oferta numeric(10,2),
    telefono character varying(255),
    correo_electronico character varying(255) NOT NULL,
    fecha_sesion date NOT NULL,
    id_oferta integer,
    pagado boolean DEFAULT false,
    id_oferta_personalizada integer
);
    DROP TABLE public.reservas;
       public         heap r       postgres    false            �            1259    74280    reservas_id_reserva_seq    SEQUENCE     �   CREATE SEQUENCE public.reservas_id_reserva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.reservas_id_reserva_seq;
       public               postgres    false    222            m           0    0    reservas_id_reserva_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.reservas_id_reserva_seq OWNED BY public.reservas.id_reserva;
          public               postgres    false    221            �            1259    98449 	   servicios    TABLE     2  CREATE TABLE public.servicios (
    id_servicio integer NOT NULL,
    nombre_servicio character varying(255) NOT NULL,
    descripcion_servicio text,
    precio_servicio numeric(10,2) DEFAULT 0 NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);
    DROP TABLE public.servicios;
       public         heap r       postgres    false            �            1259    98448    servicios_id_servicio_seq    SEQUENCE     �   CREATE SEQUENCE public.servicios_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.servicios_id_servicio_seq;
       public               postgres    false    224            n           0    0    servicios_id_servicio_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.servicios_id_servicio_seq OWNED BY public.servicios.id_servicio;
          public               postgres    false    223            �            1259    74272    trabajadores    TABLE     >  CREATE TABLE public.trabajadores (
    id_trabajador integer NOT NULL,
    usuario character varying(255) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    ci character varying(255) NOT NULL,
    telefono character varying(255),
    puesto character varying(255),
    direccion character varying(255),
    salario numeric,
    foto_perfil character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public.trabajadores;
       public         heap r       postgres    false            �            1259    74271    trabajadores_id_trabajador_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajadores_id_trabajador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.trabajadores_id_trabajador_seq;
       public               postgres    false    220            o           0    0    trabajadores_id_trabajador_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.trabajadores_id_trabajador_seq OWNED BY public.trabajadores.id_trabajador;
          public               postgres    false    219            p           2604    74266    ofertas id_oferta    DEFAULT     v   ALTER TABLE ONLY public.ofertas ALTER COLUMN id_oferta SET DEFAULT nextval('public.ofertas_id_oferta_seq'::regclass);
 @   ALTER TABLE public.ofertas ALTER COLUMN id_oferta DROP DEFAULT;
       public               postgres    false    218    217    218            v           2604    98503    ofertas_personalizadas id    DEFAULT     �   ALTER TABLE ONLY public.ofertas_personalizadas ALTER COLUMN id SET DEFAULT nextval('public.ofertas_personalizadas_id_seq'::regclass);
 H   ALTER TABLE public.ofertas_personalizadas ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            w           2604    98510    ofertas_servicios id    DEFAULT     |   ALTER TABLE ONLY public.ofertas_servicios ALTER COLUMN id SET DEFAULT nextval('public.ofertas_servicios_id_seq'::regclass);
 C   ALTER TABLE public.ofertas_servicios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            r           2604    74284    reservas id_reserva    DEFAULT     z   ALTER TABLE ONLY public.reservas ALTER COLUMN id_reserva SET DEFAULT nextval('public.reservas_id_reserva_seq'::regclass);
 B   ALTER TABLE public.reservas ALTER COLUMN id_reserva DROP DEFAULT;
       public               postgres    false    221    222    222            t           2604    98452    servicios id_servicio    DEFAULT     ~   ALTER TABLE ONLY public.servicios ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicios_id_servicio_seq'::regclass);
 D   ALTER TABLE public.servicios ALTER COLUMN id_servicio DROP DEFAULT;
       public               postgres    false    224    223    224            q           2604    74275    trabajadores id_trabajador    DEFAULT     �   ALTER TABLE ONLY public.trabajadores ALTER COLUMN id_trabajador SET DEFAULT nextval('public.trabajadores_id_trabajador_seq'::regclass);
 I   ALTER TABLE public.trabajadores ALTER COLUMN id_trabajador DROP DEFAULT;
       public               postgres    false    219    220    220            X          0    74263    ofertas 
   TABLE DATA           �   COPY public.ofertas (id_oferta, nombre_oferta, precio_venta, descripcion, "createdAt", "updatedAt", cantidad_fotos, locacion, transportacion, cambios_ropa) FROM stdin;
    public               postgres    false    218   E.      `          0    98500    ofertas_personalizadas 
   TABLE DATA           N   COPY public.ofertas_personalizadas (id, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    226   0      b          0    98507    ofertas_servicios 
   TABLE DATA           �   COPY public.ofertas_servicios (id, id_servicio, id_oferta_personalizada, cantidad, "createdAt", "updatedAt", "totalServicio") FROM stdin;
    public               postgres    false    228   A0      \          0    74281    reservas 
   TABLE DATA           �   COPY public.reservas (id_reserva, nombre_cliente, apellidos, ci, descripcion_oferta, precio_venta_oferta, telefono, correo_electronico, fecha_sesion, id_oferta, pagado, id_oferta_personalizada) FROM stdin;
    public               postgres    false    222   �0      ^          0    98449 	   servicios 
   TABLE DATA           �   COPY public.servicios (id_servicio, nombre_servicio, descripcion_servicio, precio_servicio, created_at, updated_at) FROM stdin;
    public               postgres    false    224   2      Z          0    74272    trabajadores 
   TABLE DATA           �   COPY public.trabajadores (id_trabajador, usuario, "passwordHash", nombre, apellidos, ci, telefono, puesto, direccion, salario, foto_perfil, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �3      p           0    0    ofertas_id_oferta_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.ofertas_id_oferta_seq', 7, true);
          public               postgres    false    217            q           0    0    ofertas_personalizadas_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.ofertas_personalizadas_id_seq', 39, true);
          public               postgres    false    225            r           0    0    ofertas_servicios_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.ofertas_servicios_id_seq', 72, true);
          public               postgres    false    227            s           0    0    reservas_id_reserva_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.reservas_id_reserva_seq', 51, true);
          public               postgres    false    221            t           0    0    servicios_id_servicio_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.servicios_id_servicio_seq', 31, true);
          public               postgres    false    223            u           0    0    trabajadores_id_trabajador_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.trabajadores_id_trabajador_seq', 8, true);
          public               postgres    false    219            �           2606    98505 2   ofertas_personalizadas ofertas_personalizadas_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.ofertas_personalizadas
    ADD CONSTRAINT ofertas_personalizadas_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.ofertas_personalizadas DROP CONSTRAINT ofertas_personalizadas_pkey;
       public                 postgres    false    226            y           2606    74270    ofertas ofertas_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.ofertas
    ADD CONSTRAINT ofertas_pkey PRIMARY KEY (id_oferta);
 >   ALTER TABLE ONLY public.ofertas DROP CONSTRAINT ofertas_pkey;
       public                 postgres    false    218            �           2606    98512 (   ofertas_servicios ofertas_servicios_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.ofertas_servicios
    ADD CONSTRAINT ofertas_servicios_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.ofertas_servicios DROP CONSTRAINT ofertas_servicios_pkey;
       public                 postgres    false    228            }           2606    74288    reservas reservas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id_reserva);
 @   ALTER TABLE ONLY public.reservas DROP CONSTRAINT reservas_pkey;
       public                 postgres    false    222                       2606    139160 '   servicios servicios_nombre_servicio_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key UNIQUE (nombre_servicio);
 Q   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key;
       public                 postgres    false    224            �           2606    139162 (   servicios servicios_nombre_servicio_key1 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key1 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key1;
       public                 postgres    false    224            �           2606    139372 )   servicios servicios_nombre_servicio_key10 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key10 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key10;
       public                 postgres    false    224            �           2606    139154 *   servicios servicios_nombre_servicio_key100 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key100 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key100;
       public                 postgres    false    224            �           2606    139346 *   servicios servicios_nombre_servicio_key101 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key101 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key101;
       public                 postgres    false    224            �           2606    139152 *   servicios servicios_nombre_servicio_key102 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key102 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key102;
       public                 postgres    false    224            �           2606    139354 *   servicios servicios_nombre_servicio_key103 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key103 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key103;
       public                 postgres    false    224            �           2606    139348 *   servicios servicios_nombre_servicio_key104 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key104 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key104;
       public                 postgres    false    224            �           2606    139352 *   servicios servicios_nombre_servicio_key105 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key105 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key105;
       public                 postgres    false    224            �           2606    139350 *   servicios servicios_nombre_servicio_key106 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key106 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key106;
       public                 postgres    false    224            �           2606    139286 *   servicios servicios_nombre_servicio_key107 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key107 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key107;
       public                 postgres    false    224            �           2606    139240 *   servicios servicios_nombre_servicio_key108 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key108 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key108;
       public                 postgres    false    224            �           2606    139108 *   servicios servicios_nombre_servicio_key109 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key109 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key109;
       public                 postgres    false    224            �           2606    139374 )   servicios servicios_nombre_servicio_key11 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key11 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key11;
       public                 postgres    false    224            �           2606    139104 *   servicios servicios_nombre_servicio_key110 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key110 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key110;
       public                 postgres    false    224            �           2606    139106 *   servicios servicios_nombre_servicio_key111 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key111 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key111;
       public                 postgres    false    224            �           2606    139264 *   servicios servicios_nombre_servicio_key112 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key112 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key112;
       public                 postgres    false    224            �           2606    139276 *   servicios servicios_nombre_servicio_key113 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key113 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key113;
       public                 postgres    false    224            �           2606    139266 *   servicios servicios_nombre_servicio_key114 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key114 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key114;
       public                 postgres    false    224            �           2606    139274 *   servicios servicios_nombre_servicio_key115 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key115 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key115;
       public                 postgres    false    224            �           2606    139268 *   servicios servicios_nombre_servicio_key116 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key116 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key116;
       public                 postgres    false    224            �           2606    139272 *   servicios servicios_nombre_servicio_key117 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key117 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key117;
       public                 postgres    false    224            �           2606    139270 *   servicios servicios_nombre_servicio_key118 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key118 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key118;
       public                 postgres    false    224            �           2606    139330 *   servicios servicios_nombre_servicio_key119 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key119 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key119;
       public                 postgres    false    224            �           2606    139340 )   servicios servicios_nombre_servicio_key12 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key12 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key12;
       public                 postgres    false    224            �           2606    139328 *   servicios servicios_nombre_servicio_key120 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key120 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key120;
       public                 postgres    false    224            �           2606    139320 *   servicios servicios_nombre_servicio_key121 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key121 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key121;
       public                 postgres    false    224            �           2606    139312 *   servicios servicios_nombre_servicio_key122 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key122 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key122;
       public                 postgres    false    224            �           2606    139318 *   servicios servicios_nombre_servicio_key123 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key123 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key123;
       public                 postgres    false    224            �           2606    139314 *   servicios servicios_nombre_servicio_key124 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key124 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key124;
       public                 postgres    false    224            �           2606    139316 *   servicios servicios_nombre_servicio_key125 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key125 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key125;
       public                 postgres    false    224            �           2606    139284 *   servicios servicios_nombre_servicio_key126 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key126 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key126;
       public                 postgres    false    224            �           2606    139242 *   servicios servicios_nombre_servicio_key127 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key127 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key127;
       public                 postgres    false    224            �           2606    139282 *   servicios servicios_nombre_servicio_key128 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key128 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key128;
       public                 postgres    false    224            �           2606    139250 *   servicios servicios_nombre_servicio_key129 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key129 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key129;
       public                 postgres    false    224            �           2606    139376 )   servicios servicios_nombre_servicio_key13 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key13 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key13;
       public                 postgres    false    224            �           2606    139244 *   servicios servicios_nombre_servicio_key130 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key130 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key130;
       public                 postgres    false    224            �           2606    139248 *   servicios servicios_nombre_servicio_key131 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key131 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key131;
       public                 postgres    false    224            �           2606    139246 *   servicios servicios_nombre_servicio_key132 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key132 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key132;
       public                 postgres    false    224            �           2606    139228 *   servicios servicios_nombre_servicio_key133 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key133 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key133;
       public                 postgres    false    224            �           2606    139110 *   servicios servicios_nombre_servicio_key134 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key134 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key134;
       public                 postgres    false    224            �           2606    139226 *   servicios servicios_nombre_servicio_key135 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key135 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key135;
       public                 postgres    false    224            �           2606    139224 *   servicios servicios_nombre_servicio_key136 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key136 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key136;
       public                 postgres    false    224            �           2606    139112 *   servicios servicios_nombre_servicio_key137 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key137 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key137;
       public                 postgres    false    224            �           2606    139222 *   servicios servicios_nombre_servicio_key138 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key138 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key138;
       public                 postgres    false    224            �           2606    139114 *   servicios servicios_nombre_servicio_key139 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key139 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key139;
       public                 postgres    false    224            �           2606    139338 )   servicios servicios_nombre_servicio_key14 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key14 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key14;
       public                 postgres    false    224            �           2606    139220 *   servicios servicios_nombre_servicio_key140 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key140 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key140;
       public                 postgres    false    224            �           2606    139116 *   servicios servicios_nombre_servicio_key141 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key141 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key141;
       public                 postgres    false    224            �           2606    139218 *   servicios servicios_nombre_servicio_key142 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key142 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key142;
       public                 postgres    false    224            �           2606    139118 *   servicios servicios_nombre_servicio_key143 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key143 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key143;
       public                 postgres    false    224            �           2606    139120 *   servicios servicios_nombre_servicio_key144 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key144 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key144;
       public                 postgres    false    224            �           2606    139148 *   servicios servicios_nombre_servicio_key145 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key145 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key145;
       public                 postgres    false    224            �           2606    139122 *   servicios servicios_nombre_servicio_key146 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key146 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key146;
       public                 postgres    false    224            �           2606    139124 *   servicios servicios_nombre_servicio_key147 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key147 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key147;
       public                 postgres    false    224            �           2606    139146 *   servicios servicios_nombre_servicio_key148 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key148 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key148;
       public                 postgres    false    224            �           2606    139126 *   servicios servicios_nombre_servicio_key149 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key149 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key149;
       public                 postgres    false    224            �           2606    139378 )   servicios servicios_nombre_servicio_key15 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key15 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key15;
       public                 postgres    false    224            �           2606    139128 *   servicios servicios_nombre_servicio_key150 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key150 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key150;
       public                 postgres    false    224            �           2606    139144 *   servicios servicios_nombre_servicio_key151 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key151 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key151;
       public                 postgres    false    224            �           2606    139130 *   servicios servicios_nombre_servicio_key152 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key152 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key152;
       public                 postgres    false    224            �           2606    139132 *   servicios servicios_nombre_servicio_key153 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key153 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key153;
       public                 postgres    false    224            �           2606    139142 *   servicios servicios_nombre_servicio_key154 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key154 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key154;
       public                 postgres    false    224            �           2606    139140 *   servicios servicios_nombre_servicio_key155 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key155 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key155;
       public                 postgres    false    224            �           2606    139134 *   servicios servicios_nombre_servicio_key156 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key156 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key156;
       public                 postgres    false    224                       2606    139136 *   servicios servicios_nombre_servicio_key157 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key157 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key157;
       public                 postgres    false    224                       2606    139138 *   servicios servicios_nombre_servicio_key158 
   CONSTRAINT     p   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key158 UNIQUE (nombre_servicio);
 T   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key158;
       public                 postgres    false    224                       2606    139062 )   servicios servicios_nombre_servicio_key16 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key16 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key16;
       public                 postgres    false    224                       2606    139336 )   servicios servicios_nombre_servicio_key17 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key17 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key17;
       public                 postgres    false    224            	           2606    139150 )   servicios servicios_nombre_servicio_key18 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key18 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key18;
       public                 postgres    false    224                       2606    139156 )   servicios servicios_nombre_servicio_key19 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key19 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key19;
       public                 postgres    false    224                       2606    139368 (   servicios servicios_nombre_servicio_key2 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key2 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key2;
       public                 postgres    false    224                       2606    139334 )   servicios servicios_nombre_servicio_key20 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key20 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key20;
       public                 postgres    false    224                       2606    139332 )   servicios servicios_nombre_servicio_key21 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key21 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key21;
       public                 postgres    false    224                       2606    139158 )   servicios servicios_nombre_servicio_key22 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key22 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key22;
       public                 postgres    false    224                       2606    139326 )   servicios servicios_nombre_servicio_key23 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key23 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key23;
       public                 postgres    false    224                       2606    139324 )   servicios servicios_nombre_servicio_key24 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key24 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key24;
       public                 postgres    false    224                       2606    139208 )   servicios servicios_nombre_servicio_key25 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key25 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key25;
       public                 postgres    false    224                       2606    139322 )   servicios servicios_nombre_servicio_key26 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key26 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key26;
       public                 postgres    false    224                       2606    139210 )   servicios servicios_nombre_servicio_key27 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key27 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key27;
       public                 postgres    false    224                       2606    139072 )   servicios servicios_nombre_servicio_key28 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key28 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key28;
       public                 postgres    false    224            !           2606    139070 )   servicios servicios_nombre_servicio_key29 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key29 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key29;
       public                 postgres    false    224            #           2606    139164 (   servicios servicios_nombre_servicio_key3 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key3 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key3;
       public                 postgres    false    224            %           2606    139068 )   servicios servicios_nombre_servicio_key30 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key30 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key30;
       public                 postgres    false    224            '           2606    139212 )   servicios servicios_nombre_servicio_key31 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key31 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key31;
       public                 postgres    false    224            )           2606    139066 )   servicios servicios_nombre_servicio_key32 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key32 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key32;
       public                 postgres    false    224            +           2606    139214 )   servicios servicios_nombre_servicio_key33 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key33 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key33;
       public                 postgres    false    224            -           2606    139216 )   servicios servicios_nombre_servicio_key34 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key34 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key34;
       public                 postgres    false    224            /           2606    139064 )   servicios servicios_nombre_servicio_key35 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key35 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key35;
       public                 postgres    false    224            1           2606    139366 )   servicios servicios_nombre_servicio_key36 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key36 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key36;
       public                 postgres    false    224            3           2606    139358 )   servicios servicios_nombre_servicio_key37 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key37 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key37;
       public                 postgres    false    224            5           2606    139364 )   servicios servicios_nombre_servicio_key38 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key38 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key38;
       public                 postgres    false    224            7           2606    139360 )   servicios servicios_nombre_servicio_key39 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key39 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key39;
       public                 postgres    false    224            9           2606    139076 (   servicios servicios_nombre_servicio_key4 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key4 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key4;
       public                 postgres    false    224            ;           2606    139362 )   servicios servicios_nombre_servicio_key40 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key40 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key40;
       public                 postgres    false    224            =           2606    139310 )   servicios servicios_nombre_servicio_key41 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key41 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key41;
       public                 postgres    false    224            ?           2606    139074 )   servicios servicios_nombre_servicio_key42 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key42 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key42;
       public                 postgres    false    224            A           2606    139308 )   servicios servicios_nombre_servicio_key43 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key43 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key43;
       public                 postgres    false    224            C           2606    139080 )   servicios servicios_nombre_servicio_key44 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key44 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key44;
       public                 postgres    false    224            E           2606    139206 )   servicios servicios_nombre_servicio_key45 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key45 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key45;
       public                 postgres    false    224            G           2606    139082 )   servicios servicios_nombre_servicio_key46 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key46 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key46;
       public                 postgres    false    224            I           2606    139204 )   servicios servicios_nombre_servicio_key47 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key47 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key47;
       public                 postgres    false    224            K           2606    139084 )   servicios servicios_nombre_servicio_key48 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key48 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key48;
       public                 postgres    false    224            M           2606    139202 )   servicios servicios_nombre_servicio_key49 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key49 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key49;
       public                 postgres    false    224            O           2606    139356 (   servicios servicios_nombre_servicio_key5 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key5 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key5;
       public                 postgres    false    224            Q           2606    139086 )   servicios servicios_nombre_servicio_key50 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key50 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key50;
       public                 postgres    false    224            S           2606    139200 )   servicios servicios_nombre_servicio_key51 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key51 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key51;
       public                 postgres    false    224            U           2606    139186 )   servicios servicios_nombre_servicio_key52 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key52 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key52;
       public                 postgres    false    224            W           2606    139188 )   servicios servicios_nombre_servicio_key53 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key53 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key53;
       public                 postgres    false    224            Y           2606    139252 )   servicios servicios_nombre_servicio_key54 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key54 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key54;
       public                 postgres    false    224            [           2606    139198 )   servicios servicios_nombre_servicio_key55 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key55 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key55;
       public                 postgres    false    224            ]           2606    139260 )   servicios servicios_nombre_servicio_key56 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key56 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key56;
       public                 postgres    false    224            _           2606    139262 )   servicios servicios_nombre_servicio_key57 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key57 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key57;
       public                 postgres    false    224            a           2606    139196 )   servicios servicios_nombre_servicio_key58 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key58 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key58;
       public                 postgres    false    224            c           2606    139278 )   servicios servicios_nombre_servicio_key59 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key59 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key59;
       public                 postgres    false    224            e           2606    139078 (   servicios servicios_nombre_servicio_key6 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key6 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key6;
       public                 postgres    false    224            g           2606    139280 )   servicios servicios_nombre_servicio_key60 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key60 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key60;
       public                 postgres    false    224            i           2606    139194 )   servicios servicios_nombre_servicio_key61 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key61 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key61;
       public                 postgres    false    224            k           2606    139190 )   servicios servicios_nombre_servicio_key62 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key62 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key62;
       public                 postgres    false    224            m           2606    139192 )   servicios servicios_nombre_servicio_key63 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key63 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key63;
       public                 postgres    false    224            o           2606    139258 )   servicios servicios_nombre_servicio_key64 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key64 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key64;
       public                 postgres    false    224            q           2606    139254 )   servicios servicios_nombre_servicio_key65 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key65 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key65;
       public                 postgres    false    224            s           2606    139256 )   servicios servicios_nombre_servicio_key66 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key66 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key66;
       public                 postgres    false    224            u           2606    139184 )   servicios servicios_nombre_servicio_key67 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key67 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key67;
       public                 postgres    false    224            w           2606    139088 )   servicios servicios_nombre_servicio_key68 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key68 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key68;
       public                 postgres    false    224            y           2606    139182 )   servicios servicios_nombre_servicio_key69 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key69 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key69;
       public                 postgres    false    224            {           2606    139344 (   servicios servicios_nombre_servicio_key7 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key7 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key7;
       public                 postgres    false    224            }           2606    139090 )   servicios servicios_nombre_servicio_key70 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key70 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key70;
       public                 postgres    false    224                       2606    139180 )   servicios servicios_nombre_servicio_key71 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key71 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key71;
       public                 postgres    false    224            �           2606    139092 )   servicios servicios_nombre_servicio_key72 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key72 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key72;
       public                 postgres    false    224            �           2606    139178 )   servicios servicios_nombre_servicio_key73 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key73 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key73;
       public                 postgres    false    224            �           2606    139176 )   servicios servicios_nombre_servicio_key74 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key74 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key74;
       public                 postgres    false    224            �           2606    139094 )   servicios servicios_nombre_servicio_key75 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key75 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key75;
       public                 postgres    false    224            �           2606    139174 )   servicios servicios_nombre_servicio_key76 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key76 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key76;
       public                 postgres    false    224            �           2606    139172 )   servicios servicios_nombre_servicio_key77 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key77 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key77;
       public                 postgres    false    224            �           2606    139096 )   servicios servicios_nombre_servicio_key78 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key78 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key78;
       public                 postgres    false    224            �           2606    139170 )   servicios servicios_nombre_servicio_key79 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key79 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key79;
       public                 postgres    false    224            �           2606    139370 (   servicios servicios_nombre_servicio_key8 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key8 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key8;
       public                 postgres    false    224            �           2606    139168 )   servicios servicios_nombre_servicio_key80 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key80 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key80;
       public                 postgres    false    224            �           2606    139098 )   servicios servicios_nombre_servicio_key81 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key81 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key81;
       public                 postgres    false    224            �           2606    139166 )   servicios servicios_nombre_servicio_key82 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key82 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key82;
       public                 postgres    false    224            �           2606    139306 )   servicios servicios_nombre_servicio_key83 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key83 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key83;
       public                 postgres    false    224            �           2606    139100 )   servicios servicios_nombre_servicio_key84 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key84 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key84;
       public                 postgres    false    224            �           2606    139304 )   servicios servicios_nombre_servicio_key85 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key85 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key85;
       public                 postgres    false    224            �           2606    139302 )   servicios servicios_nombre_servicio_key86 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key86 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key86;
       public                 postgres    false    224            �           2606    139102 )   servicios servicios_nombre_servicio_key87 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key87 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key87;
       public                 postgres    false    224            �           2606    139300 )   servicios servicios_nombre_servicio_key88 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key88 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key88;
       public                 postgres    false    224            �           2606    139298 )   servicios servicios_nombre_servicio_key89 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key89 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key89;
       public                 postgres    false    224            �           2606    139342 (   servicios servicios_nombre_servicio_key9 
   CONSTRAINT     n   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key9 UNIQUE (nombre_servicio);
 R   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key9;
       public                 postgres    false    224            �           2606    139230 )   servicios servicios_nombre_servicio_key90 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key90 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key90;
       public                 postgres    false    224            �           2606    139296 )   servicios servicios_nombre_servicio_key91 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key91 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key91;
       public                 postgres    false    224            �           2606    139232 )   servicios servicios_nombre_servicio_key92 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key92 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key92;
       public                 postgres    false    224            �           2606    139294 )   servicios servicios_nombre_servicio_key93 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key93 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key93;
       public                 postgres    false    224            �           2606    139234 )   servicios servicios_nombre_servicio_key94 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key94 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key94;
       public                 postgres    false    224            �           2606    139292 )   servicios servicios_nombre_servicio_key95 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key95 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key95;
       public                 postgres    false    224            �           2606    139236 )   servicios servicios_nombre_servicio_key96 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key96 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key96;
       public                 postgres    false    224            �           2606    139290 )   servicios servicios_nombre_servicio_key97 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key97 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key97;
       public                 postgres    false    224            �           2606    139288 )   servicios servicios_nombre_servicio_key98 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key98 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key98;
       public                 postgres    false    224            �           2606    139238 )   servicios servicios_nombre_servicio_key99 
   CONSTRAINT     o   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_servicio_key99 UNIQUE (nombre_servicio);
 S   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_nombre_servicio_key99;
       public                 postgres    false    224            �           2606    98457    servicios servicios_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicio);
 B   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_pkey;
       public                 postgres    false    224            {           2606    74279    trabajadores trabajadores_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.trabajadores
    ADD CONSTRAINT trabajadores_pkey PRIMARY KEY (id_trabajador);
 H   ALTER TABLE ONLY public.trabajadores DROP CONSTRAINT trabajadores_pkey;
       public                 postgres    false    220            �           2606    139386 @   ofertas_servicios ofertas_servicios_id_oferta_personalizada_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ofertas_servicios
    ADD CONSTRAINT ofertas_servicios_id_oferta_personalizada_fkey FOREIGN KEY (id_oferta_personalizada) REFERENCES public.ofertas_personalizadas(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.ofertas_servicios DROP CONSTRAINT ofertas_servicios_id_oferta_personalizada_fkey;
       public               postgres    false    5055    226    228            �           2606    139381 4   ofertas_servicios ofertas_servicios_id_servicio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ofertas_servicios
    ADD CONSTRAINT ofertas_servicios_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio) ON UPDATE CASCADE;
 ^   ALTER TABLE ONLY public.ofertas_servicios DROP CONSTRAINT ofertas_servicios_id_servicio_fkey;
       public               postgres    false    224    5053    228            �           2606    139047     reservas reservas_id_oferta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_id_oferta_fkey FOREIGN KEY (id_oferta) REFERENCES public.ofertas(id_oferta) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.reservas DROP CONSTRAINT reservas_id_oferta_fkey;
       public               postgres    false    218    222    4729            �           2606    139054 .   reservas reservas_id_oferta_personalizada_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_id_oferta_personalizada_fkey FOREIGN KEY (id_oferta_personalizada) REFERENCES public.ofertas_personalizadas(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.reservas DROP CONSTRAINT reservas_id_oferta_personalizada_fkey;
       public               postgres    false    5055    226    222            X   �  x����r�0��{�xV�e��A'�0á\8岱*�%#ٝ�7��#��X�� Sz���z�I����-��f��6t�b	�1Ea��v}0�"4V{���w���>�{(���Z{����;������`�m��S�;�M���������8�O���ܡ��EGG۶���-�Y�-�"k㎓EXܘ8�,�qT�&��c���z��~�#O
�^b�D*�tY)L�*[b~�JP�Һ����}$���pc�]B'�	�{�뽫���:wՓk���U��k����d�_TX���8��*�*��RΑ�L9���[$��
��c'�����W�|���ßp%�㫽�;>�)Щ���gn���/�����/}��;��#�R��#ʋT��G��Q&SY���;^��$&�4I�o�Rb      `   -   x�3��4202�50�54R00�2��21ҳ�4�50�#����� n�_      b   d   x����� ��R��dò��~�(z�̛ī�In�B�DxT.��S��y�f@�7��
��Щ3��Z!�?oI�y/Ǿ%�Q�A�^ЖB;~�A�      \   >  x�U��N�0�g�)nC#;��v��B���\\�28v������00�y1���n�u�����)yF��yp^Y�8�0 ٖ����j�&�B�@�G��+؜m�Vvr����PS8�� {��V�_6��Y��Z���0��W���M;�pT>ľ��ݯ6��:%3� �s7Q�,��ǷQ�/
.��6JD�d���Y����0�����*��Ij{-�G�h9m"�SJJ	��iL�/9����8`!GRҒ��X�-a�#�c����ke0>�L�<�^MdK+^�X�u$SqQVQ]���H<SM�C������H���)�,����      ^   �  x�}�Mn�0���)t3���Mp�,[ 6����n!t�3��X��q�f@�>�{Ù'����/.���w�j�<4/�]q7��z��]ZDc@�+p+���P!)���$��~D�ۧ��GA���
Q�$��H;�oDtQcE^G,�8��Gt�"��=Wdz��d&I,g$B����r�R��g�J��h�vM���4��ul�.nb���8<�o xk��\;2Ib8�q#�ɱF�<6�I�,y�D��T��7z�$ṑ5�FS�x#J����N�$/v��s���a?�D���EIښʒ���>�$�M����O��ô'�d��=����0dk+��si�%IV��M�X�n����R�iOP��$'ֻ����5�e�Q!p-�$I�X�s)�P|M/�M}���X�NI�ty�\��ŧ~;�ܴ���Z�`X�I��hvZ�^`��3wL.�{%��8`d�      Z   �  x�m��r�:�r�!��я%�޹�H	6!͜���81��M�ٝK9˳Ȫ��;2�49�{��ox����uR
Ή<��\�⼓-^e�cr;�׋����h;�ٗ��^���R�N��꡸���of�kY��W	������Ō;����ٔ`��U�#.�\��LS���W�~�_t���`��z�c@a�_`���\G\ ��i��q��2�'�j4�~�٘�j���-|ꪭ�����Ǔ�͆�{�*�o���p��0�QQ��k����GnX.Fٍ� Fl���DI�	��%�����.a?�����.T	[6{'$�>�$���1ǣ�r)����%��(	x�E�N�FS"���%�8��#�WY�=���9�(���U~��d?��O&��0�����'����I�d(�c�1\
�����2ɒ�*�[�3�a�;�NC�eT�y9��D���=F�çߘ�����������>��be�U9�]��UmmU��v�߅~"ڎs�����q�M��0��t�-�0)bD4iڀ�~
�ۿ:*�N1pߗ�|i2K~�s���?�������B&�*=�z��q���� ��vaG��|J?w�v����1������o��g6:���e�aܤf81���;��VѾ�g�w*��ق���%<r	j�;�;w??}5�ȕ�Ɍ���lS�@fU��JM�is]�*�I����G�es�a%�{m7ۢ�nV�uvv��R�     